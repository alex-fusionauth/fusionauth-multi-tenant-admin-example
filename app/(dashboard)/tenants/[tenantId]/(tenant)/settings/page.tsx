export default async function TenantDashboard({
    params,
}: {
    params: Promise<{ tenantId: string }>
}) {
    const tenantId = (await params).tenantId;

    return (
        <div
            className="flex flex-col w-full gap-2 md:gap-4"
        >

        </div>
    );
}