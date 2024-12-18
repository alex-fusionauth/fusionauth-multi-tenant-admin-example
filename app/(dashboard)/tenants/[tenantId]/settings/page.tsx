import { getTenant } from '@/lib/fusionauth-dal';
import TenantBreadcrumb from '../tenant-breadcrumb';
import TenantTabs from '../tenant-tabs';

// TODO: Update misssing TODOs

export default async function TenantDashboard({
    params,
}: {
    params: Promise<{ tenantId: string }>
}) {
    const tenantId = (await params).tenantId;
    const tenant = await getTenant(tenantId);

    return (
        <div
            className="flex flex-col w-full gap-2 md:gap-4"
        >
            <TenantBreadcrumb tenantId={tenantId} />
            <TenantTabs />
        </div>
    );
}