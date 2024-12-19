import { client } from '@/lib/fusionauth-dal';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default async function ApplicationBreadcrumb({
  tenantId,
  applicationId,
}: {
  tenantId: string,
  applicationId: string
}) {
  const tenant = (await client.retrieveTenant(tenantId)).response.tenant;
  const application = (await client.retrieveApplication(applicationId)).response.application;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/tenants/`}>Tenants</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/tenants/${tenantId}/applications`}>{tenant?.name || tenantId}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{application?.name || applicationId}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}