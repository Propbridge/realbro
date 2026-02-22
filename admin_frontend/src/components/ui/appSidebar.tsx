import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent, 
    SidebarGroupLabel,
    SidebarMenu,        
    SidebarMenuButton,  
    SidebarMenuItem,    
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Building2, Users, Calendar, ClipboardList, Image, UserCog, ChartBarBig, WalletIcon } from "lucide-react" 

// Define items in an array for cleaner code
const items = [
    { title: "Dashboard", url: "#", icon: ChartBarBig },
    { title: "Property Management", url: "#", icon: Building2 },
    { title: "User Management", url: "#", icon: Users },
    { title: "Appointments", url: "#", icon: Calendar },
    { title: "Requirement Board", url: "#", icon: ClipboardList },
    { title: "Financials", url: "#", icon: WalletIcon },
    { title: "Banner Management", url: "#", icon: Image },
    { title: "Role Management", url: "#", icon: UserCog },
]

export const AppSidebar = () => {
    return (
        <Sidebar className="top-18! h-[calc(100svh-4.5rem)]!">
            <SidebarHeader>
                {/* Add logo or brand here if needed */}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="text-[18px] font-medium text-gray-500 h-12 w-3xs hover:bg-blue-100 hover:text-blue-500">
                                        <a href={item.url}>
                                            <item.icon className="!size-5"/>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};