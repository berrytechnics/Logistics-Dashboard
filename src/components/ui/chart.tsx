"use client"

import { ReactNode } from "react"
import { ResponsiveContainer } from "recharts"

interface ChartProps {
  children: ReactNode
  className?: string
}

export function Chart({ children, className }: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={350}>
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  )
} 