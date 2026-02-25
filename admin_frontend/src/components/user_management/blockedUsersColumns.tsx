"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2, OctagonMinus,ArrowUpDown } from "lucide-react"


export type BlockedUserColumnInterface = {
    username: string
    email: string
    role: string
    blockedOn: string
    blockedBy: string
    isBlocked: boolean
}

export const BlockedUsersColumns: ColumnDef<BlockedUserColumnInterface>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const { username, isBlocked } = row.original
            return (
                <div className="flex items-center gap-2 pl-2">
                    <span className={`size-2 rounded-full shrink-0 ${isBlocked ? "bg-red-500" : "bg-green-500"}`} />
                    <span className="font-medium">{username}</span>
                </div>
            )
        },
    },

    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },

    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.original.role;
            return <div className="font-semibold text-blue-500">{role}</div>
        },
    },
    {
        accessorKey: "blockedOn",
        header: "Blocked On",
        cell: ({ row }) => {
            const user = row.original
            return <div className="font-medium ">{user.blockedOn}</div>
        },
    },
    {
        accessorKey: "blockedBy",
        header: "Blocked By",
        cell: ({ row }) => {
            const user = row.original
            return <div className="font-medium ">{user.blockedBy}</div>
        },
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:bg-blue-100"
                        onClick={() => console.log("View", user)}
                    >
                        <Eye className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-amber-600 hover:bg-amber-100"
                        onClick={() => console.log("Edit", user)}
                    >
                        <Pencil className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-orange-600 hover:bg-orange-100"
                        onClick={() => console.log("Block", user)}
                    >
                        <OctagonMinus className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:bg-red-100"
                        onClick={() => console.log("Delete", user)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            )
        },
    },
]
