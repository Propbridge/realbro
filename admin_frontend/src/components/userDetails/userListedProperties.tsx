"use client"

import { useState } from "react"
import { PropertyCard } from "./propertyCard"
import { demoProperties } from "./types"

const tabs = ["All", "Exclusive", "Active", "Sold", "Unlisted", "Deleted"] as const

export function UserListedProperties() {
    const [activeTab, setActiveTab] = useState<string>(tabs[0])

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-lg font-semibold mb-3">Listed Properties</h2>
            <div className="flex gap-2 flex-wrap mb-3">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                            activeTab === tab
                                ? "bg-blue-500 text-white"
                                : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
                {demoProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    )
}
