"use client"

import { type Table } from "@tanstack/react-table"
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

function getPageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | "ellipsis")[] = []

    pages.push(1)

    if (currentPage > 3) {
        pages.push("ellipsis")
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (currentPage < totalPages - 2) {
        pages.push("ellipsis")
    }

    pages.push(totalPages)

    return pages
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    const currentPage = table.getState().pagination.pageIndex + 1
    const totalPages = table.getPageCount()

    const pages = getPageNumbers(currentPage, totalPages)

    return (
        <div className="bg-white  rounded-md border mt-2">

            <div className="flex items-center justify-between py-2 px-5">
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-9"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-9"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="size-4" />
                    </Button>

                    {pages.map((page, i) =>
                        page === "ellipsis" ? (
                            <span
                                key={`ellipsis-${i}`}
                                className="flex size-9 items-center justify-center text-sm text-muted-foreground"
                            >
                                ...
                            </span>
                        ) : (
                            <Button
                                key={page}
                                variant={currentPage === page ? "outline" : "ghost"}
                                size="icon"
                                className={`size-9 ${currentPage === page ? "border-2 border-gray-400 font-bold" : ""}`}
                                onClick={() => table.setPageIndex(page - 1)}
                            >
                                {page}
                            </Button>
                        )
                    )}

                    <Button
                        variant="outline"
                        size="icon"
                        className="size-9"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-9"
                        onClick={() => table.setPageIndex(totalPages - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRight className="size-4" />
                    </Button>
                </div>

                <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => table.setPageSize(Number(value))}
                >
                    <SelectTrigger className="h-9 w-[70px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {[10, 20, 25, 30, 50].map((size) => (
                            <SelectItem key={size} value={`${size}`}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
