import { getApplications } from '@/lib/fusionauth-dal';

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
      Application
    </div>
  );
}
