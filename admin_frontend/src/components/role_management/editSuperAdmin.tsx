"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Pencil, XIcon, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { api } from "@/lib/api"
import { AxiosError } from "axios"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

interface SuperAdminData {
    id: string
    firstName: string | null
    lastName: string | null
    email: string
    isActive: boolean
}

interface UpdateSuperAdminInput {
    firstName?: string
    lastName?: string
    age?: number
    gender?: "MALE" | "FEMALE" | "OTHER"
    email?: string
    password?: string
}

const defaultInput: UpdateSuperAdminInput = {
    firstName: "",
    lastName: "",
    age: 0,
    gender: "MALE",
    email: "",
    password: "",
}

const fetchSuperAdminById = async (id: string): Promise<SuperAdminData> => {
    const response = await api.get(`/staff/management/get-superadmin/${id}`)
    return response.data.superAdmin
}

const updateSuperAdminApi = async ({ id, data }: { id: string; data: UpdateSuperAdminInput }) => {
    const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
    }
    const response = await api.put(`/staff/management/update-superadmin/${id}`, payload)
    return response.data
}

const mapSuperAdminToInput = (user: SuperAdminData): UpdateSuperAdminInput => ({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    age: 0,
    gender: "MALE",
    email: user.email ?? "",
    password: "",
})

export function EditSuperAdmin({ superAdminId }: { superAdminId: string }) {
    const router = useRouter()
    const [apiError, setApiError] = useState<string | null>(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [overrides, setOverrides] = useState<Partial<UpdateSuperAdminInput>>({})
    const [showPassword, setShowPassword] = useState(false)

    const { data: superAdmin, isLoading, isError, error: fetchError } = useQuery({
        queryKey: ["superadmin", superAdminId],
        queryFn: () => fetchSuperAdminById(superAdminId),
        enabled: !!superAdminId,
    })

    const input = useMemo<UpdateSuperAdminInput>(() => {
        const base = superAdmin ? mapSuperAdminToInput(superAdmin) : defaultInput
        return { ...base, ...overrides }
    }, [superAdmin, overrides])

    const updateMutation = useMutation({
        mutationFn: updateSuperAdminApi,
        onSuccess: () => {
            setApiError(null)
            toast.success("Super admin updated successfully", { position: "bottom-center" })
        },
        onError: (error) => {
            if (error instanceof AxiosError && error.response?.status === 401) {
                router.replace("/signin")
                return
            }
            const msg =
                error instanceof AxiosError
                    ? (error.response?.data as { message?: string })?.message || error.message
                    : "Failed to update super admin"
            setApiError(msg)
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setConfirmOpen(true)
    }

    const handleConfirmUpdate = () => {
        setConfirmOpen(false)
        setApiError(null)
        const payload: UpdateSuperAdminInput = { ...input }
        if (!payload.password) {
            delete payload.password
        }
        updateMutation.mutate({ id: superAdminId, data: payload })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="size-8 animate-spin text-blue-500" />
                <span className="ml-2 text-muted-foreground">Loading super admin details...</span>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="p-6">
                <div className="p-4 rounded-lg bg-red-50 text-red-600">
                    Failed to load super admin details:{" "}
                    {fetchError instanceof AxiosError
                        ? (fetchError.response?.data as { message?: string })?.message || fetchError.message
                        : "Unknown error"}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6">
            <Card className="relative max-w-5xl">
                <CardHeader className="pb-0">
                    <CardTitle className="text-xl font-semibold">Edit Details</CardTitle>
                    <CardDescription>Update details of super admin.</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="p-6 pt-2">
                        {apiError && (
                            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">{apiError}</div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            <div className="space-y-5">
                                <h3 className="text-base font-semibold">Credentials</h3>

                                {/* use it after testing if website works throught */}

                                {/* <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <FieldLabel>First Name</FieldLabel>
                                        <Input
                                            placeholder="eg. John"
                                            className="h-10 border bg-white"
                                            value={input.firstName}
                                            onChange={(e) => setOverrides((p) => ({ ...p, firstName: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <FieldLabel>Last Name</FieldLabel>
                                        <Input
                                            placeholder="eg. Doe"
                                            className="h-10 border bg-white"
                                            value={input.lastName}
                                            onChange={(e) => setOverrides((p) => ({ ...p, lastName: e.target.value }))}
                                        />
                                    </div>
                                </div> */}
                                {/* <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <FieldLabel>Enter Age</FieldLabel>
                                        <Input
                                            type="number"
                                            placeholder="eg. 28"
                                            className="h-10 border bg-white"
                                            min={0}
                                            value={input.age || ""}
                                            onChange={(e) =>
                                                setOverrides((p) => ({ ...p, age: parseInt(e.target.value, 10) || 0 }))
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <FieldLabel>Select Gender</FieldLabel>
                                        <Select
                                            value={input.gender}
                                            onValueChange={(v) =>
                                                setOverrides((p) => ({ ...p, gender: v as "MALE" | "FEMALE" | "OTHER" }))
                                            }
                                        >
                                            <SelectTrigger className="h-10 border shadow-none bg-white">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="MALE">Male</SelectItem>
                                                    <SelectItem value="FEMALE">Female</SelectItem>
                                                    <SelectItem value="OTHER">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div> */}

                                {/* <div className="space-y-1.5">
                                    <FieldLabel>Enter email</FieldLabel>
                                    <Input
                                        type="email"
                                        placeholder="eg. testemail123@gmail.com"
                                        className="h-10 border bg-white"
                                        value={input.email}
                                        onChange={(e) => setOverrides((p) => ({ ...p, email: e.target.value }))}
                                    />
                                </div> */}
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-1.5">
                                    <FieldLabel>
                                        New password{" "}
                                        <span className="text-xs text-muted-foreground font-normal">
                                            (leave blank to keep current)
                                        </span>
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            className="h-10 border bg-white pr-10"
                                            placeholder="Enter new password"
                                            value={input.password}
                                            onChange={(e) =>
                                                setOverrides((p) => ({ ...p, password: e.target.value }))
                                            }
                                            minLength={6}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((p) => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="justify-end gap-3 px-6 mb-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="gap-2 border-red-200 hover:bg-red-50 hover:text-red-600 shadow-none"
                            onClick={() => router.push("/role-management")}
                        >
                            <XIcon className="size-5 text-red-500" />
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="gap-2 bg-blue-500 hover:bg-blue-700 text-white"
                            disabled={updateMutation.isPending}
                        >
                            <Pencil className="size-4" />
                            {updateMutation.isPending ? "Updating..." : "Update Changes"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Update</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to update this super admin&apos;s details? This action will overwrite the existing information.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            className="bg-blue-500 hover:bg-blue-700 text-white"
                            onClick={handleConfirmUpdate}
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending ? "Updating..." : "Yes, Update"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
