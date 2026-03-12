import { UserActionsAndDetails } from "./userActions&Details"
import { UserListedProperties } from "./userListedProperties"
import type { FullUserData } from "./types"

type FullUserDetailsProps = {
    user: FullUserData
    onUserUpdated?: () => void
}

export function FullUserDetails({ user, onUserUpdated }: FullUserDetailsProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100svh-5rem)]">
            {/* Left column: user info + selling history — scrolls independently */}
            <div className="overflow-y-auto overflow-x-hidden pr-2">
                <UserActionsAndDetails user={user} onUserUpdated={onUserUpdated} />
            </div>

            {/* Right column: listed properties — scrolls independently */}
            <div className="overflow-y-auto pr-2">
                <UserListedProperties propertiesByStatus={user.properties_by_status} />
            </div>
        </div>
    )
}
