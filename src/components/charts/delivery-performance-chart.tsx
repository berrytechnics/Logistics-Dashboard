"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Analytics, apiService } from "@/lib/api"
import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ChartData {
  week: string
  onTime: number
  delayed: number
  avgDeliveryTime: number
}

export function DeliveryPerformanceChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiService.getAnalytics()
      .then((analytics: Analytics) => {
        // Use the weekly data if available, otherwise fall back to the old format
        if (analytics.performance.weeklyData) {
          setData(analytics.performance.weeklyData.map(week => ({
            week: week.week,
            onTime: week.onTime,
            delayed: week.delayed,
            avgDeliveryTime: week.avgTime
          })))
        } else {
          // Fallback to the old format with daily data
          const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          const onTime = analytics.performance.onTimeDelivery
          const delayed = 100 - onTime
          const avg = analytics.performance.averageTransitTime
          setData(DAYS.map(day => ({ week: day, onTime, delayed, avgDeliveryTime: avg })))
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
        <CardTitle>Delivery Performance</CardTitle>
        <CardDescription>On-time delivery rates and average delivery times</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-12 text-center text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="onTime" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
                name="On Time (%)"
              />
              <Area 
                type="monotone" 
                dataKey="delayed" 
                stackId="1"
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.6}
                name="Delayed (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
} 