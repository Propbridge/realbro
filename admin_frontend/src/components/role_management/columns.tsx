"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Pencil, Trash2, OctagonMinus, ShieldCheck } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

export type RoleManagement = {
    id: string;
    username: string;
    email: string;
    role: string;
    isActive: boolean;
    blockDate?: string;
}

interface ColumnActions {
    onBlock: (staff: RoleManagement) => void;
    onDelete: (staff: RoleManagement) => void;
}

export const getColumns = ({ onBlock, onDelete }: ColumnActions): ColumnDef<RoleManagement>[] => [
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
            const user = row.original
            return <div className="font-medium pl-4">{user.username}</div>
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
        cell: ({ row }) => {
            const user = row.original
            return <div className="font-medium text-blue-500">{user.email}</div>

        }

    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const user = row.original
            return <div className="font-semibold text-blue-500">{user.role}</div>
        },
    },
    {
        accessorKey: "blockDate",
        header: "Block Date",
        cell: ({ row }) => {
            const user = row.original
            return <div className="font-medium">{user.blockDate}</div>
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original
            const isSuperAdmin = user.role === "Super Admin" || user.role === "SUPER_ADMIN"
            const editHref = isSuperAdmin ? `/role-management/edit-superadmin/${user.id}` : `/role-management/edit-staff/${user.id}`

            return (
                <div className="flex items-center gap-1">
                    <Link
                        href={editHref}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                        title="Edit"
                    >
                        <Pencil className="size-4" />
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${user.isActive
                            ? "text-orange-600 hover:text-orange-800 hover:bg-orange-100"
                            : "text-green-600 hover:text-green-800 hover:bg-green-100"
                            } ${isSuperAdmin ? "opacity-50 cursor-not-allowed hover:bg-transparent" : ""}`}
                        onClick={() => !isSuperAdmin && onBlock(user)}
                        title={isSuperAdmin ? "Super Admin cannot be blocked" : user.isActive ? "Block" : "Unblock"}
                        disabled={isSuperAdmin}
                    >
                        {user.isActive ? (
                            <OctagonMinus className="size-4" />
                        ) : (
                            <ShieldCheck className="size-4" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-100 ${isSuperAdmin ? "opacity-50 cursor-not-allowed hover:bg-transparent" : ""}`}
                        onClick={() => !isSuperAdmin && onDelete(user)}
                        title={isSuperAdmin ? "Super Admin cannot be deleted" : "Delete"}
                        disabled={isSuperAdmin}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            )
        },
    },
]