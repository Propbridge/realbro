"use client"

import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Pie, PieChart } from "recharts"

import { api } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart"

type ListingMode = "all" | "userListing" | "exclusiveListing"

type PropertiesAnalyticsCompact = {
	userListingsPriceUnder5L: number
	userListingsPrice5LTo25L: number
	userListingsPrice25LTo50L: number
	userListingsPrice50LTo1Cr: number
	userListingsPriceAbove1Cr: number
	exclusiveListingsPriceUnder5L: number
	exclusiveListingsPrice5LTo25L: number
	exclusiveListingsPrice25LTo50L: number
	exclusiveListingsPrice50LTo1Cr: number
	exclusiveListingsPriceAbove1Cr: number
}

type ChartRow = {
	bucket: string
	value: number
	fill: string
}

const chartConfig = {
	value: {
		label: "Properties",
	},
	under5L: {
		label: "0 - 5 Lakh",
		color: "#3b82f6",
	},
	between5LAnd25L: {
		label: "5 - 25 Lakh",
		color: "#60a5fa",
	},
	between25LAnd50L: {
		label: "25 - 50 Lakh",
		color: "#93c5fd",
	},
	between50LAnd1Cr: {
		label: "50L - 1 Cr",
		color: "#bfdbfe",
	},
	above1Cr: {
		label: "1 Cr above",
		color: "#dbeafe",
	},
} satisfies ChartConfig

export function InventoryDistributionChart() {
	const [mode, setMode] = useState<ListingMode>("all")

	const { data, isLoading, isError } = useQuery({
		queryKey: ["dashboard", "inventory-distribution", mode],
		queryFn: async () => {
			const response = await api.get<{ success: boolean; data: PropertiesAnalyticsCompact }>(
				"/analytics/properties?view=compact"
			)
			return response.data.data
		},
		staleTime: 60 * 1000,
	})

	const chartData = useMemo<ChartRow[]>(() => {
		const user = {
			under5L: data?.userListingsPriceUnder5L ?? 0,
			between5LAnd25L: data?.userListingsPrice5LTo25L ?? 0,
			between25LAnd50L: data?.userListingsPrice25LTo50L ?? 0,
			between50LAnd1Cr: data?.userListingsPrice50LTo1Cr ?? 0,
			above1Cr: data?.userListingsPriceAbove1Cr ?? 0,
		}

		const exclusive = {
			under5L: data?.exclusiveListingsPriceUnder5L ?? 0,
			between5LAnd25L: data?.exclusiveListingsPrice5LTo25L ?? 0,
			between25LAnd50L: data?.exclusiveListingsPrice25LTo50L ?? 0,
			between50LAnd1Cr: data?.exclusiveListingsPrice50LTo1Cr ?? 0,
			above1Cr: data?.exclusiveListingsPriceAbove1Cr ?? 0,
		}

		const values =
			mode === "userListing"
				? user
				: mode === "exclusiveListing"
					? exclusive
					: {
							under5L: user.under5L + exclusive.under5L,
							between5LAnd25L: user.between5LAnd25L + exclusive.between5LAnd25L,
							between25LAnd50L: user.between25LAnd50L + exclusive.between25LAnd50L,
							between50LAnd1Cr: user.between50LAnd1Cr + exclusive.between50LAnd1Cr,
							above1Cr: user.above1Cr + exclusive.above1Cr,
						}

		return [
			{ bucket: "under5L", value: values.under5L, fill: "var(--color-under5L)" },
			{ bucket: "between5LAnd25L", value: values.between5LAnd25L, fill: "var(--color-between5LAnd25L)" },
			{ bucket: "between25LAnd50L", value: values.between25LAnd50L, fill: "var(--color-between25LAnd50L)" },
			{ bucket: "between50LAnd1Cr", value: values.between50LAnd1Cr, fill: "var(--color-between50LAnd1Cr)" },
			{ bucket: "above1Cr", value: values.above1Cr, fill: "var(--color-above1Cr)" },
		]
	}, [data, mode])

	const total = chartData.reduce((sum, item) => sum + item.value, 0)

	if (isError) {
		return <div className="rounded-lg border p-4 text-sm text-red-500">Failed to load inventory distribution.</div>
	}

	return (
		<Card className="bg-white">
			<CardHeader className="pb-0">
				<div className="flex items-center justify-between gap-3">
					<div>
						<CardTitle>Inventory Distribution</CardTitle>
						<CardDescription>
							{mode === "all"
								? "All listings"
								: mode === "userListing"
									? "User listings"
									: "Exclusive listings"}
						</CardDescription>
					</div>

					<Select value={mode} onValueChange={(value) => setMode(value as ListingMode)}>
						<SelectTrigger className="w-42.5 font-medium text-black">
							<SelectValue placeholder="Select listing type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="userListing">User Listing</SelectItem>
							<SelectItem value="exclusiveListing">Exclusive Listing</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>

			<CardContent className="pt-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-[360px_1fr] md:items-center">
					<div className="relative">
						<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
							<PieChart>
								<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
								<Pie
									data={chartData}
									dataKey="value"
									nameKey="bucket"
									innerRadius={78}
									outerRadius={108}
									strokeWidth={4}
								/>
							</PieChart>
						</ChartContainer>

						<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
							<span className="text-xs text-muted-foreground">Total</span>
							<span className="text-xl font-semibold">{total.toLocaleString()}</span>
						</div>

						{isLoading && (
							<div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/70 backdrop-blur-[1px]">
								<Skeleton className="size-44 rounded-full" />
							</div>
						)}
					</div>

					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{chartData.map((item) => {
							const percent = total > 0 ? Number(((item.value / total) * 100).toFixed(1)) : 0
							const label = chartConfig[item.bucket as keyof typeof chartConfig]?.label ?? item.bucket

							return (
								<div key={item.bucket} className="flex items-start gap-2">
									<span className="mt-1 size-2.5 rounded" style={{ backgroundColor: item.fill }} />
									<div>
										<div className="text-sm font-medium text-foreground">{label}</div>
										<div className="text-xs text-muted-foreground">
											{percent}% ({item.value.toLocaleString()})
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

