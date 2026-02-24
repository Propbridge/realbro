import { AllUsersDataTable } from "@/components/user_management/allUsersDataTable"
import { allUsersColumns, type UserColumnInterface, KYCStatus } from "@/components/user_management/allUsersColumns"

const demoUsers: UserColumnInterface[] = Array.from({ length: 15 }, (_, i) => ({
    username: "Emily White",
    email: "ahhgdjsjh@gmail.com",
    isVerified: i % 3 === 0,
    propertyListings: { total: 10, sold: 3, active: 4, unlisted: 3 },
    gems: 54545,
    kycStatus: i % 4 === 1 ? KYCStatus.Pending : KYCStatus.Verified,
    isBlocked: i % 5 === 3,
}))

export default function AllUsersPage() {
    return (
        <div>
            <AllUsersDataTable columns={allUsersColumns} data={demoUsers} />
        </div>
    )
}
