import { getApplications } from '@/lib/fusionauth-dal';
import DataTable from './data-table';

export default async function Applications({
  params,
}: {
  params: Promise<{ tenantId: string }>
}) {
  const tenantId = (await params).tenantId;
  const applications = await getApplications(tenantId);
  return (
    <div
      className="flex flex-col w-full"
    >
      <DataTable data={applications} />
    </div>
  );
}
