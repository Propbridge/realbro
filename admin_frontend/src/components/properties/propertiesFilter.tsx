"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bookmark, ChevronDown, Settings2Icon } from "lucide-react"

interface PropertiesFilterProps {
    showOnlyBookmarked?: boolean
    onToggleBookmarked?: (checked: boolean) => void
}

export function PropertiesFilter({ showOnlyBookmarked = false, onToggleBookmarked }: PropertiesFilterProps) {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="hover:bg-zinc-50 gap-2 shadow-none border-2 h-10">
                        <Settings2Icon className="size-4 text-blue-500" />
                        Filter
                        <ChevronDown className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuGroup>
                        {onToggleBookmarked && (
                            <DropdownMenuCheckboxItem
                                checked={showOnlyBookmarked}
                                onCheckedChange={(checked) => onToggleBookmarked(Boolean(checked))}
                                className="font-medium text-start"
                            >
                                <Bookmark className="mr-2 size-3.5 text-gray-600" />
                                Bookmarked only
                            </DropdownMenuCheckboxItem>
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
