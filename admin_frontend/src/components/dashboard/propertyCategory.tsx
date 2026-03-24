"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Pie, PieChart } from "recharts"
import { api } from "@/lib/api"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

export const description = "A donut chart"

type PropertiesAnalyticsCompact = {
  residentialCount: number
  commercialCount: number
  farmlandCount: number
}

const chartConfig = {
  count: {
    label: "Properties",
  },
  residential: {
    label: "Residential",
    color: "#630194",
  },
  commercial: {
    label: "Commercial",
    color: "#85A0D6",
  },
  farmland: {
    label: "Farmland",
    color: "#60B53E",
  },
} satisfies ChartConfig

export function PropertyCategoryChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", "property-category", "compact"],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: PropertiesAnalyticsCompact }>(
        "/analytics/properties?view=compact"
      )
      return response.data.data
    },
    staleTime: 60 * 1000,
  })

  const chartData = useMemo(
    () => [
      {
        segment: "residential",
        count: data?.residentialCount ?? 0,
        fill: "#630194",
      },
      {
        segment: "commercial",
        count: data?.commercialCount ?? 0,
        fill: "#85A0D6",
      },
      {
        segment: "farmland",
        count: data?.farmlandCount ?? 0,
        fill: "#60B53E ",
      },
    ],
    [data]
  )

  const total = chartData.reduce((sum, item) => sum + item.count, 0)

  if (isError) {
    return <div className="rounded-lg border p-4 text-sm text-red-500">Failed to load property category analytics.</div>
  }

  return (
    <Card className="flex flex-col bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Property Category Chart</CardTitle>
        <CardDescription>Live distribution by category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="relative">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-62.5"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="segment"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/70 backdrop-blur-[1px]">
              <Skeleton className="size-40 rounded-full" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="w-full text-center text-muted-foreground">Total categorized: {total}</div>
        <div className="flex w-full items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded bg-[#630194]" />
            Residential
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded bg-[#85A0D6]" />
            Commercial
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded bg-[#60B53E]" />
            Farmland
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
