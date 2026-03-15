"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import type { PropertyCardData } from "@/components/properties/propertyCard"

export type PropertySortOption = "" | "price-desc" | "price-asc"

interface PropertiesSortDropdownProps {
    sort: PropertySortOption
    onSortChange: (sort: PropertySortOption) => void
}

export function PropertiesSortDropdown({ sort, onSortChange }: PropertiesSortDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover:bg-zinc-50 gap-2 shadow-none border-2 h-10">
                    <ArrowUpDown className="size-4 text-blue-500" />
                    Sort by
                    <ChevronDown className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem
                    onClick={() => onSortChange("price-desc")}
                    className="font-medium cursor-pointer"
                >
                    Price: High to low
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onSortChange("price-asc")}
                    className="font-medium cursor-pointer"
                >
                    Price: Low to high
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function parsePrice(price: string): number | null {
    if (!price || price === "N/A") return null
    const parsed = parseFloat(price.replace(/,/g, ""))
    return Number.isNaN(parsed) ? null : parsed
}

export function sortPropertiesByPrice(
    properties: PropertyCardData[],
    sort: PropertySortOption
): PropertyCardData[] {
    if (!sort || sort === "") return properties
    const arr = [...properties]
    arr.sort((a, b) => {
        const aVal = parsePrice(a.price)
        const bVal = parsePrice(b.price)
        if (sort === "price-desc") {
            return (bVal ?? -Infinity) - (aVal ?? -Infinity)
        }
        return (aVal ?? Infinity) - (bVal ?? Infinity)
    })
    return arr
}
