// import axios from "axios";
import {columns} from "@/components/role_management/columns";
import {DataTable} from "@/components/role_management/data-table";
import { type RoleManagement } from "@/components/role_management/columns";

async function getRoleManagement(): Promise<RoleManagement[]> {
    // const response = await axios.get("https://api.example.com/role-management")
    // const data = await response.json()
    // return data
    return [
        {
            username: "Uday Kumar",
            email: "uday@example.com",
            role: "Super Admin",
            blockDate: "2021-01-01",
        },
        {
            username: "John Doe",
            email: "john.doe@example.com",
            role: "Admin",
            blockDate: "2021-01-01",
        },
        {
            username: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Viewer",
        },
        {
            username: "Uday Kumar",
            email: "uday@example.com",
            role: "Super Admin",
            blockDate: "2021-01-01",
        },
        {
            username: "John Doe",
            email: "john.doe@example.com",
            role: "Admin",
            blockDate: "2021-01-01",
        },
        {
            username: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Viewer",
        },
        {
            username: "Uday Kumar",
            email: "uday@example.com",
            role: "Super Admin",
            blockDate: "2021-01-01",
        },
        {
            username: "John Doe",
            email: "john.doe@example.com",
            role: "Admin",
            blockDate: "2021-01-01",
        },
        {
            username: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Viewer",
        },
        {
            username: "Uday Kumar",
            email: "uday@example.com",
            role: "Super Admin",
            blockDate: "2021-01-01",
        },
        {
            username: "John Doe",
            email: "john.doe@example.com",
            role: "Admin",
            blockDate: "2021-01-01",
        },
        {
            username: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Viewer",
        },
        {
            username: "Uday Kumar",
            email: "uday@example.com",
            role: "Super Admin",
            blockDate: "2021-01-01",
        },
        {
            username: "John Doe",
            email: "john.doe@example.com",
            role: "Admin",
            blockDate: "2021-01-01",
        },
        {
            username: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Viewer",
        },
    ]
}

export default async function RoleManagement() {
    const data = await getRoleManagement();
    return (
        <div>

            <DataTable columns={columns} data={data}/>
        </div>
    )
}