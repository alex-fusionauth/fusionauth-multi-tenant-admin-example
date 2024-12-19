import TenantTabs from './tenant-tabs';
import TenantBreadcrumb from './tenant-breadcrumb';

export default async function TabsLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ tenantId: string, applicationId: string }>
}) {
  const tenantId = (await params).tenantId;
  return (
    <div
      className="flex flex-col w-full gap-2 md:gap-4"
    >
      <TenantBreadcrumb tenantId={tenantId} />
      <TenantTabs />
      {children}
    </div>
  );
}
