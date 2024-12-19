import { client } from '@/lib/fusionauth-dal';
import LinkTable from '@/components/link-table';

export default async function Applications({
  params,
}: {
  params: Promise<{ tenantId: string }>
}) {
  const tenantId = (await params).tenantId;
  client.setTenantId(tenantId); //TODO: This seems like an API bug.
  const applications = (await client.retrieveApplications()).response.applications;
  return (
    <div
      className="flex flex-col w-full gap-2 md:gap-4"
    >
      {applications ? <LinkTable linkBase={`tenants/${tenantId}/applications`} linkPath='/users' data={applications} head={['Name', 'Id']} /> : 'No Applications Found.'}
    </div>
  );
}
