"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2, OctagonMinus, BadgeCheck, ShieldCheck, Clock } from "lucide-react"

export enum KYCStatus {
    Verified = "Verified",
    Pending = "Pending",
}

export type UserColumnInterface = {
    username: string
    email: string
    gems: number
    kycStatus: KYCStatus
    isVerified: boolean
    propertyListings: {
        total: number
        sold: number
        active: number
        unlisted: number
    }
    isBlocked: boolean
}

export const allUsersColumns: ColumnDef<UserColumnInterface>[] = [
    {
        accessorKey: "username",
        header: "User Name",
        cell: ({ row }) => {
            const { username, isBlocked, isVerified } = row.original
            return (
                <div className="flex items-center gap-2 pl-2">
                    <span className={`size-2 rounded-full shrink-0 ${isBlocked ? "bg-red-500" : "bg-green-500"}`} />
                    <span className="font-medium">{username}</span>
                    {isVerified && <BadgeCheck className="size-4 text-blue-500 shrink-0" />}
                </div>
            )
        },
    },

    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="text-blue-500 font-medium">
                {row.original.email}
            </div>
        ),
    },

    {
        id: "propertyListings",
        header: "Property Listing Details",
        cell: ({ row }) => {
            const l = row.original.propertyListings
            return (
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                    Total: <span className="font-semibold text-foreground">{l.total}</span>
                    {" ,Sold: "}<span className="font-semibold text-foreground">{l.sold}</span>
                    {", Active: "}<span className="font-semibold text-foreground">{l.active}</span>
                    {", Unlisted: "}<span className="font-semibold text-green-600">{l.unlisted}</span>
                </div>
            )
        },
    },

    {
        accessorKey: "gems",
        header: "Gems",
        cell: ({ row }) => (
            <div className="flex items-center gap-1.5 font-semibold text-green-600">
                <span className="text-orange-500">💎</span>
                {row.original.gems.toLocaleString()}
            </div>
        ),
    },

    {
        accessorKey: "kycStatus",
        header: "KYC Status",
        cell: ({ row }) => {
            const status = row.original.kycStatus
            const isVerified = status === KYCStatus.Verified

            return (
                <div className={`flex items-center gap-1.5 font-medium ${isVerified ? "text-green-600" : "text-orange-500"}`}>
                    {isVerified
                        ? <ShieldCheck className="size-4" />
                        : <Clock className="size-4" />
                    }
                    {status}
                </div>
            )
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
