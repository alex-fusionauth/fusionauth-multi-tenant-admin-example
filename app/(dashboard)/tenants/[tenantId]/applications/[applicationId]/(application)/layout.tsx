import ApplicationTabs from './application-tabs';
import ApplicationBreadcrumb from './application-breadcrumb';

export default async function TabsLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  users: React.ReactNode,
  params: Promise<{ tenantId: string, applicationId: string }>
}) {
  const tenantId = (await params).tenantId;
  const applicationId = (await params).applicationId;
  return (
    <div
      className="flex flex-col w-full gap-2 md:gap-4"
    >
      <ApplicationBreadcrumb tenantId={tenantId} applicationId={applicationId} />
      <ApplicationTabs />
      {children}
    </div>
  );
}
