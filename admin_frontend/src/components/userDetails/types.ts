export type PropertyStatus = "Active" | "Sold" | "Unlisted" | "Deleted" | "Exclusive"

export type PropertyListing = {
    id: string
    title: string
    location: string
    date: string
    price: string
    area: string
    status: PropertyStatus
    image: string
    isExclusive?: boolean
}

export const demoProperties: PropertyListing[] = Array.from({ length: 8 }, (_, i) => ({
    id: `prop-${i + 1}`,
    title: "3BHK Flat in Arera Colony",
    location: "Arera Colony, Bhopal",
    date: "12 January, 2025",
    price: "₹ 42 Lakh",
    area: "1440 sqft",
    status: "Active" as PropertyStatus,
    image: "/bannerDemo.png",
    isExclusive: i % 3 === 0,
}))

export const demoSellingHistory: PropertyListing[] = Array.from({ length: 6 }, (_, i) => ({
    id: `sold-${i + 1}`,
    title: "3BHK Flat in Arera Colony",
    location: "Arera Colony, Bhopal",
    date: "12 January, 2025",
    price: "₹ 42 Lakh",
    area: "1440 sqft",
    status: "Sold" as PropertyStatus,
    image: "/bannerDemo.png",
    isExclusive: i % 2 === 0,
}))
