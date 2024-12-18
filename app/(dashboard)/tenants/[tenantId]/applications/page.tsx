import { getApplications } from '@/lib/fusionauth-dal';
import TenantBreadcrumb from '../breadcrumb';
import LinkTable from '@/components/link-table';
import TenantTabs from '../tenant-tabs';

export default async function Applications({
  params,
}: {
  params: Promise<{ tenantId: string }>
}) {
  const tenantId = (await params).tenantId;
  const applications = await getApplications(tenantId);
  return (
    <div
      className="flex flex-col w-full gap-2 md:gap-4"
    >
      <TenantBreadcrumb tenantId={tenantId} />
      <TenantTabs />
      <LinkTable linkBase={`tenants/${tenantId}/applications`} linkPath='/users' data={applications} head={['Name', 'Id']} />
    </div>
  );
}
