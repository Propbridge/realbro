import { AnalyticsCards } from "@/components/dashboard/analyticsCards";
import { MyChart } from "@/components/dashboard/userAnalytics";
import { InventoryVelocityChart } from "@/components/dashboard/inventoryVelocity";
import { PropertyCategoryChart } from "@/components/dashboard/propertyCategory";
import { InventoryDistributionChart } from "@/components/dashboard/inventoryDistribution";

export default function Dashboard() {
    return (
        <div className="space-y-4">
            <div>
                <AnalyticsCards />
            </div>
            <div className="flex flex-col gap-3">
                <MyChart />
                <InventoryVelocityChart />
                <PropertyCategoryChart/>
                <InventoryDistributionChart />
            </div>
        </div>
    );
}