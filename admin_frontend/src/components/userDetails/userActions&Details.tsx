import { Building2, Gem, Handshake, IndianRupee, Mail, PenLine, PhoneCallIcon, Verified } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { OctagonMinus } from "lucide-react";
import { UserSellingHistory } from "./userSellingHistory";

export type UserActionsAndDetailsInterface = {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
};

export function UserActionsAndDetails() {
    return (
        <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-4 w-full justify-start">
                <Avatar className="h-16 w-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback >CN</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                    <div className="font-bold text-xl">
                        John Doe
                    </div>
                    <Verified />
                </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
                <Button variant="outline" className="gap-2 h-12 w-32 border-red-200 hover:bg-red-50 hover:text-red-600 shadow-none">
                    <OctagonMinus className="size-5 text-orange-500" />
                    Block User
                </Button>
                <Button variant="outline" className="gap-2 h-12 w-32 border-red-200 hover:bg-red-50 hover:text-red-600 shadow-none">
                    <Gem className="size-5 text-green-500" />
                    <p>Send Gems</p>
                </Button>
                <Button variant="outline" className="gap-2 h-12 w-32 border-red-200 hover:bg-red-50 hover:text-red-600 shadow-none">
                    <PenLine className="size-5 text-blue-500" />
                    <p>Edit User</p>
                </Button>
                <Button variant="default" className="bg-green-500 hover:bg h-11 w-12 hover:bg-green-600">
                    <PhoneCallIcon className="size-5" />
                </Button>
                <Button variant="default" className="bg-blue-500 hover:bg h-11 w-12">
                    <Mail className="size-5" />
                </Button>
            </div>
            <div>
                <h1 className="font-medium py-4 px-2 text-xl">User Details</h1>
                <div className="grid grid-cols-4 gap-2">
                    <div className="border-2 p-2 px-3 rounded-md bg-white">
                        <div className="flex flex-col gap-1">
                            <Gem className="size-5 text-green-500" />
                            <p className="text-lg font-bold">151,752</p>
                            <p className="text-[12px]">Gems in Wallet</p>
                        </div>
                    </div>
                    <div className="border-2 p-2 px-3 rounded-md bg-white">
                        <div className="flex flex-col gap-1">
                            <Building2 className="size-5 text-green-500" />
                            <p className="text-lg font-bold">10</p>
                            <p className="text-[12px]">Total Properties</p>
                        </div>
                    </div>
                    <div className="border-2 p-2 px-3 rounded-md bg-white">
                        <div className="flex flex-col gap-1">
                            <Handshake className="size-5 text-blue-500" />
                            <p className="text-lg font-bold">4</p>
                            <p className="text-[12px]">Sold to RealBro</p>
                        </div>
                    </div>
                    <div className="border-2 p-2 px-3 rounded-md bg-white">
                        <div className="flex flex-col gap-1">
                            <IndianRupee className="size-5 text-green-500" />
                            <p className="text-lg font-bold">1.2 Cr</p>
                            <p className="text-[12px]">Prop. Worth</p>
                        </div>
                    </div>
                </div>
                <UserSellingHistory />
            </div>
        </div>
    )
}
