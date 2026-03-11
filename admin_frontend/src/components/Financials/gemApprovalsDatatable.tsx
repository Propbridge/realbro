"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react"
import { DataTablePagination } from "../ui/data-table-pagination"
import { ExportButton, type ExportColumn } from "../role_management/exportButton"
import { GemApprovalFilter, type GemApprovalFilterState } from "./gemApprovalFilter"

interface GemApprovalsDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filters?: GemApprovalFilterState
    onFiltersChange?: (f: GemApprovalFilterState) => void
}

export function GemApprovalsDataTable<TData, TValue>({
    columns,
    data,
    filters,
    onFiltersChange,
}: GemApprovalsDataTableProps<TData, TValue>) {
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter,
            sorting,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, _columnId, filterValue) => {
            const search = filterValue.toLowerCase()
            const userName = String(row.getValue("userName") ?? "").toLowerCase()
            const purpose = String(row.getValue("purpose") ?? "").toLowerCase()
            const requestedByStaff = String(row.getValue("requestedByStaff") ?? "").toLowerCase()
            const amount = String(row.getValue("amount") ?? "").toLowerCase()
            const details = String(row.getValue("details") ?? "").toLowerCase()
            const status = String(row.getValue("status") ?? "").toLowerCase()
            return (
                userName.includes(search) ||
                purpose.includes(search) ||
                requestedByStaff.includes(search) ||
                amount.includes(search) ||
                details.includes(search) ||
                status.includes(search)
            )
        },
    })

    const exportColumns: ExportColumn[] = [
        { key: "userName", header: "User Name" },
        { key: "purpose", header: "Purpose" },
        { key: "status", header: "Status" },
        { key: "amount", header: "Amount" },
        { key: "requestedByStaff", header: "Requested By Staff" },
        { key: "details", header: "Details" },
    ]
    const exportData = table.getFilteredRowModel().rows.map((r) => r.original as Record<string, unknown>)

    return (
        <div>
            <div className="flex items-center py-4 gap-8 justify-between">
                <h1 className="font-medium text-lg p-2 pl-4">Gem Approvals</h1>
                <div className="flex items-center gap-4">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-blue-500" />
                        <Input
                            placeholder="Search Anything"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="h-10 pl-9 border-2 bg-white"
                        />
                    </div>
                    <ExportButton
                        data={exportData}
                        columns={exportColumns}
                        filename="gem-approvals"
                    />
                    {filters != null && onFiltersChange && (
                        <GemApprovalFilter filters={filters} onFiltersChange={onFiltersChange} />
                    )}
                </div>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="bg-[#F1F7FE]" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead className="font-medium text-lg" key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="bg-white">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}
