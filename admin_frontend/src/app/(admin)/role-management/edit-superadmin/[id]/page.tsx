import { EditSuperAdmin } from "@/components/role_management/editSuperAdmin";

export default async function EditSuperAdminPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div>
            <EditSuperAdmin superAdminId={id} />
        </div>
    );
}
