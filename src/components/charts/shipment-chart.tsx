"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { apiService, Shipment } from "@/lib/api"
import { useEffect, useState } from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ChartData {
  month: string
  shipments: number
  delivered: number
  inTransit: number
  delayed: number
}

function getMonthName(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString("default", { month: "short" })
}

export function ShipmentChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiService.getShipments()
      .then((shipments: Shipment[]) => {
        // Aggregate by month
        const map = new Map<string, { shipments: number; delivered: number; inTransit: number; delayed: number }>()
        shipments.forEach(s => {
          const month = getMonthName(s.shippedDate)
          if (!map.has(month)) {
            map.set(month, { shipments: 0, delivered: 0, inTransit: 0, delayed: 0 })
          }
          const entry = map.get(month)!
          entry.shipments++
          if (s.status === "Delivered") entry.delivered++
          if (s.status === "In Transit") entry.inTransit++
          if (s.status === "Delayed") entry.delayed++
        })
        // Sort by month order (Jan, Feb, ...)
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const chartData = Array.from(map.entries())
          .sort((a, b) => monthOrder.indexOf(a[0]) - monthOrder.indexOf(b[0]))
          .map(([month, v]) => ({ month, ...v }))
        setData(chartData)
        setLoading(false)
      })
      .catch(e => {
        setError(e.message)
        setLoading(false)
      })
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Trends</CardTitle>
        <CardDescription>Monthly shipment volume and delivery rates</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-12 text-center text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="shipments" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Total Shipments"
              />
              <Line 
                type="monotone" 
                dataKey="delivered" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Delivered"
              />
              <Line 
                type="monotone" 
                dataKey="inTransit" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="In Transit"
              />
              <Line 
                type="monotone" 
                dataKey="delayed" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Delayed"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
} 