"use client"

import Image from "next/image"
import { MapPin, Calendar, Scaling, MoreVertical, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { PropertyListing, PropertyStatus } from "./types"

const statusColor: Record<PropertyStatus, string> = {
    Active: "bg-green-500/20 text-green-700",
    Sold: "bg-blue-500/20 text-blue-700",
    Unlisted: "bg-gray-500/20 text-gray-700",
    Deleted: "bg-red-500/20 text-red-700",
    Exclusive: "bg-purple-500/20 text-purple-700",
}

export function PropertyCard({ property }: { property: PropertyListing }) {
    return (
        <div className="flex gap-3 rounded-xl border bg-white p-3">
            {/* Thumbnail */}
            <div className="relative shrink-0 w-32 h-24 rounded-lg overflow-hidden">
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                />
                <span className={`absolute top-1.5 left-1.5 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[property.status]}`}>
                    <span className="size-1.5 rounded-full bg-current" />
                    {property.status}
                </span>
                {property.isExclusive && (
                    <div className="absolute bottom-1.5 left-1.5">
                        <Crown className="size-4 text-purple-600" />
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold leading-tight truncate">{property.title}</h4>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3 shrink-0" />
                            {property.location}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="size-3 shrink-0" />
                            {property.date}
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-7 shrink-0">
                                <MoreVertical className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <span className="font-bold">{property.price}</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                        <Scaling className="size-3.5" />
                        {property.area}
                    </span>
                </div>
            </div>
        </div>
    )
}
