"use client"

import { useState } from "react"
import { PropertyCard } from "./propertyCard"
import { demoSellingHistory } from "./types"

const tabs = ["Sold to Real Bro", "Sold Exclusive Property"] as const

export function UserSellingHistory() {
    const [activeTab, setActiveTab] = useState<string>(tabs[0])

    return (
        <div className="space-y-3">
            <h1 className="font-medium mt-4 px-2 text-xl">Selling History</h1>
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${activeTab === tab
                                ? "bg-blue-500 text-white"
                                : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100svh-32rem)] pr-1">
                {demoSellingHistory.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    )
}
