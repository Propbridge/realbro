import { UserActionsAndDetails } from "./userActions&Details"
import { UserListedProperties } from "./userListedProperties"

export function FullUserDetails() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100svh-5rem)]">
            {/* Left column: user info + selling history — scrolls independently */}
            <div className="overflow-y-auto overflow-x-hidden pr-2">
                <UserActionsAndDetails />
            </div>

            {/* Right column: listed properties — scrolls independently */}
            <div className="overflow-y-auto pr-2">
                <UserListedProperties />
            </div>
        </div>
    )
}
