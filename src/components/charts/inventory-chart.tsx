"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { apiService, InventoryItem } from "@/lib/api"
import { useEffect, useState } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface ChartData {
  name: string
  value: number
  color: string
}

const STATUS_COLORS: Record<string, string> = {
  Good: "#10b981",
  Low: "#f59e0b",
  Out: "#ef4444",
}

const CATEGORY_COLORS: Record<string, string> = {
  Electronics: "#3b82f6",
  Hardware: "#8b5cf6",
  Automotive: "#f59e0b",
  Energy: "#10b981",
  Services: "#06b6d4",
  Scientific: "#ec4899",
  Industrial: "#f97316",
  Healthcare: "#ef4444",
  Manufacturing: "#84cc16",
  Retail: "#6366f1",
}

export function InventoryChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiService.getInventory()
      .then((items: InventoryItem[]) => {
        // Group by status
        const statusMap: Record<string, number> = {}
        const categoryMap: Record<string, number> = {}
        
        items.forEach(item => {
          statusMap[item.status] = (statusMap[item.status] || 0) + 1
          categoryMap[item.category] = (categoryMap[item.category] || 0) + 1
        })
        
        // Create chart data for status breakdown
        const chartData: ChartData[] = Object.entries(statusMap).map(([status, value]) => ({
          name: status === "Good" ? "In Stock" : status === "Low" ? "Low Stock" : "Out of Stock",
          value,
          color: STATUS_COLORS[status] || "#8884d8",
        }))
        
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
        <CardTitle>Inventory Status</CardTitle>
        <CardDescription>Current inventory levels across all products</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-12 text-center text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
} 