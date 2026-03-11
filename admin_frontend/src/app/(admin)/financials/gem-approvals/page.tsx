"use client"

import { useCallback, useEffect, useState } from "react"
import { createGemApprovalsColumns } from "@/components/Financials/gemApprovalsColumns"
import { GemApprovalsDataTable } from "@/components/Financials/gemApprovalsDatatable"
import type { GemApprovalRow } from "@/components/Financials/gemApprovalsColumns"
import type { GemApprovalFilterState } from "@/components/Financials/gemApprovalFilter"
import { api } from "@/lib/api"

type GemRequestResponse = {
    success: boolean
    data: Array<{
        id: string
        userId: string
        type: string
        status: string
        totalGems: number
        baseGems: number
        referralGems: number
        createdAt: string
        propertyId: string | null
        user: { firstName: string; lastName: string; email: string }
        referralUser: { firstName: string; lastName: string; email: string } | null
        requestedByStaff: { firstName: string; lastName: string }
    }>
}

const typeLabels: Record<string, string> = {
    EXCLUSIVE_ACQUISITION_REWARD: "Acquisition Reward",
    EXCLUSIVE_SALE_REWARD: "Sale Reward",
    REDEMPTION: "Redemption",
}

const statusMap: Record<string, "Pending" | "Approved" | "Rejected"> = {
    PENDING_SUPERADMIN: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
}

export default function GemApprovalsPage() {
    const [data, setData] = useState<GemApprovalRow[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState<GemApprovalFilterState>({ status: null })

    const fetchGemRequests = useCallback(async (silent = false) => {
        try {
            if (!silent) setIsLoading(true)
            setError(null)
            const params: Record<string, string | number> = {
                page: 1,
                limit: 100,
            }
            if (filters.status) params.status = filters.status

            const response = await api.get<GemRequestResponse>("/staff/gems/gem-requests", {
                params,
            })

                const mapped: GemApprovalRow[] = response.data.data.map((r) => ({
                    id: r.id,
                    userId: r.userId,
                    userName: `${r.user.firstName} ${r.user.lastName}`.trim() || "—",
                    userEmail: r.user?.email,
                    purpose: typeLabels[r.type] ?? r.type,
                    requestType: (r.type === "REDEMPTION" || r.type === "EXCLUSIVE_SALE_REWARD"
                        ? r.type
                        : "EXCLUSIVE_ACQUISITION_REWARD") as GemApprovalRow["requestType"],
                    status: statusMap[r.status] ?? "Pending",
                    amount: r.totalGems,
                    baseGems: r.baseGems,
                    referralGems: r.referralGems,
                    referralEmail: r.referralUser?.email,
                    requestedByStaff: `${r.requestedByStaff.firstName} ${r.requestedByStaff.lastName}`.trim() || "—",
                    details: new Date(r.createdAt).toLocaleString(),
                    propertyId: r.propertyId ?? null,
                }))

            setData(mapped)
        } catch (err) {
            console.error("Failed to fetch gem requests:", err)
            setError("Failed to load gem approvals")
        } finally {
            if (!silent) setIsLoading(false)
        }
    }, [filters])

    const refetch = useCallback(() => {
        fetchGemRequests(true)
    }, [fetchGemRequests])

    useEffect(() => {
        fetchGemRequests()
    }, [fetchGemRequests])

    return (
        <div className="mt-4">
            {isLoading && (
                <p className="text-sm text-gray-500 px-4 mt-4">Loading gem approvals...</p>
            )}
            {error && (
                <p className="text-sm text-red-500 px-4 mt-4">{error}</p>
            )}
            {!isLoading && !error && (
                <GemApprovalsDataTable
                    columns={createGemApprovalsColumns(refetch)}
                    data={data}
                    filters={filters}
                    onFiltersChange={setFilters}
                />
            )}
        </div>
    )
}
