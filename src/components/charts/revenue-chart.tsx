"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Analytics, apiService } from "@/lib/api"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ChartData {
  month: string
  revenue: number
  expenses: number
  profit: number
}

export function RevenueChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiService.getAnalytics()
      .then((analytics: Analytics) => {
        // Use the monthly data if available, otherwise fall back to the old format
        if (analytics.revenue.monthlyData) {
          setData(analytics.revenue.monthlyData)
        } else {
          // Fallback to the old format
          setData([
            {
              month: "Last Month",
              revenue: analytics.revenue.lastMonth,
              expenses: Math.round(analytics.revenue.lastMonth * 0.7),
              profit: analytics.revenue.lastMonth - Math.round(analytics.revenue.lastMonth * 0.7),
            },
            {
              month: "This Month",
              revenue: analytics.revenue.thisMonth,
              expenses: Math.round(analytics.revenue.thisMonth * 0.7),
              profit: analytics.revenue.thisMonth - Math.round(analytics.revenue.thisMonth * 0.7),
            },
          ])
        }
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
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-12 text-center text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              <Bar dataKey="profit" fill="#10b981" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
} 