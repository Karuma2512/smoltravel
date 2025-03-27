"use client"

import type * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({ children, config, className, ...props }: ChartContainerProps) {
  return (
    <div
      className={className}
      style={
        {
          "--chart-1": "215 25% 27%",
          "--chart-2": "142 72% 29%",
          "--chart-3": "201 96% 32%",
          "--chart-4": "0 84% 60%",
          ...Object.fromEntries(Object.entries(config).map(([key, value]) => [`--color-${key}`, value.color])),
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
}

interface ChartTooltipProps extends React.ComponentProps<typeof Tooltip> {
  className?: string
  showArrow?: boolean
}

export function ChartTooltip({ className, children, showArrow = false, ...props }: ChartTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={className} sideOffset={0} alignOffset={0} hideArrow={!showArrow} />
      </Tooltip>
    </TooltipProvider>
  )
}

interface ChartTooltipContentProps {
  payload?: Array<{ name: string; value: number; payload: Record<string, any> }>
  label?: string
  active?: boolean
}

export function ChartTooltipContent({ payload, label, active }: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        {label && (
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
          </div>
        )}
        <div className="grid gap-2">
          {payload.map((data) => (
            <div key={data.name} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1 text-[0.70rem] uppercase text-muted-foreground">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: data.color,
                  }}
                />
                {data.name}
              </span>
              <span className="font-bold">
                {data.name.toLowerCase().includes("revenue") || data.name.toLowerCase().includes("target")
                  ? `$${data.value.toLocaleString()}`
                  : data.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

