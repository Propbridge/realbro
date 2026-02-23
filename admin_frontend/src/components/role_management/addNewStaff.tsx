import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function AddNewStaff() {
    return (
        <div className="p-6">
            <Card className="max-w-3xl">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">
                        Add New Admin Staff
                    </CardTitle>
                    <CardDescription>
                        Create an access profile for your internal staff.
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-6">
                    
                    <div>
                        <CardTitle className="text-base font-medium mb-4">
                            Personal Information
                        </CardTitle>

                        <form className="space-y-6">
                            
                            {/* Row 1 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FieldLabel>First Name</FieldLabel>
                                    <Input
                                        placeholder="Eg. John"
                                        className="h-10 border"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FieldLabel>Last Name</FieldLabel>
                                    <Input
                                        placeholder="Eg. Doe"
                                        className="h-10 border"
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FieldLabel>Age</FieldLabel>
                                    <Input
                                        type="number"
                                        placeholder="Eg. 25"
                                        className="h-10 border"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FieldLabel>Select Gender</FieldLabel>
                                    <Select>
                                        <SelectTrigger className="h-10 border shadow-none">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="transgender">Transgender</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Mobile */}
                            <div className="space-y-2">
                                <FieldLabel>Enter Mobile Number</FieldLabel>
                                <Input
                                    type="tel"
                                    placeholder="Eg. 8749506784"
                                    className="h-10 border"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <FieldLabel>Enter Email</FieldLabel>
                                <Input
                                    type="email"
                                    placeholder="Eg. testmail123@gmail.com"
                                    className="h-10 border"
                                />
                            </div>

                        </form>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}