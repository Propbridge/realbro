"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDown, Settings2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

export type GemApprovalStatusFilter = "PENDING_SUPERADMIN" | "APPROVED" | "REJECTED" | null

export type GemApprovalFilterState = {
    status: GemApprovalStatusFilter
}

const STATUS_OPTIONS: { value: GemApprovalStatusFilter; label: string }[] = [
    { value: null, label: "All" },
    { value: "PENDING_SUPERADMIN", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
]

type GemApprovalFilterProps = {
    filters: GemApprovalFilterState
    onFiltersChange: (f: GemApprovalFilterState) => void
}

export function GemApprovalFilter({ filters, onFiltersChange }: GemApprovalFilterProps) {
    const [open, setOpen] = useState(false)
    const [draft, setDraft] = useState<GemApprovalFilterState>(filters)

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)
        if (nextOpen) setDraft(filters)
    }

    const hasActiveFilter = filters.status != null

    const handleApply = () => {
        onFiltersChange(draft)
        setOpen(false)
    }

    const handleClear = () => {
        setDraft({ status: null })
        onFiltersChange({ status: null })
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
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
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 max-h-[min(70vh,400px)] overflow-y-auto">
                <div className="space-y-4">
                    <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <div className="mt-2 space-y-1">
                            {STATUS_OPTIONS.map(({ value, label }) => (
                                <label
                                    key={value ?? "all"}
                                    className="flex items-center gap-2 cursor-pointer text-sm"
                                >
                                    <input
                                        type="radio"
                                        name="gemStatus"
                                        checked={draft.status === value}
                                        onChange={() => setDraft((p) => ({ ...p, status: value }))}
                                        className="rounded border-gray-300"
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" onClick={handleClear} className="flex-1">
                            Clear
                        </Button>
                        <Button size="sm" onClick={handleApply} className="flex-1">
                            Apply
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
