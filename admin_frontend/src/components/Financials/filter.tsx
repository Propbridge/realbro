"use client"

import { Fragment } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, ChevronDown, Settings2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

export type StatusFilter = "Completed" | "Pending" | "Rejected" | null

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
    { value: null, label: "All" },
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Rejected", label: "Rejected" },
]

type FilterProps = {
    statusFilter?: StatusFilter
    onStatusFilterChange?: (status: StatusFilter) => void
}

export function Filter({ statusFilter, onStatusFilterChange }: FilterProps) {
    const hasActiveFilter = statusFilter != null

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "gap-2 shadow-none border-2 h-10",
                            hasActiveFilter ? "bg-blue-50 border-blue-300 hover:bg-blue-100" : "hover:bg-zinc-50"
                        )}
                    >
                        <Settings2Icon className="size-4 text-blue-500" />
                        Filter
                        <ChevronDown className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuGroup>
                        {STATUS_OPTIONS.map(({ value, label }, i) => (
                            <Fragment key={label}>
                                {i === 1 && <DropdownMenuSeparator />}
                            <DropdownMenuItem
                                className="font-medium cursor-pointer"
                                onClick={() => onStatusFilterChange?.(value)}
                            >
                                <span className="flex-1">{label}</span>
                                {statusFilter === value && (
                                    <Check className="size-4 text-blue-500 shrink-0" />
                                )}
                            </DropdownMenuItem>
                            </Fragment>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}