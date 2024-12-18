import { client } from '@/lib/fusionauth-dal';
import ApplicationTabs from '../application-tabs';
import ApplicationBreadcrumb from '../application-breadcrumb';

export default async function Users({
  params,
}: {
  params: Promise<{ tenantId: string, applicationId: string }>
}) {
  const tenantId = (await params).tenantId;
  const applicationId = (await params).applicationId;
  const application = (await client.retrieveApplication(tenantId)).response.application;
  return (
    <div
      className="flex flex-col w-full gap-2 md:gap-4"
    >
      <ApplicationBreadcrumb tenantId={tenantId} applicationId={applicationId} />
      <ApplicationTabs />
    </div>
  );
}
