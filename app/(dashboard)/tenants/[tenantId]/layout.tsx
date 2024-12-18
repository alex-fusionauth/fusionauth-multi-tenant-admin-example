import { getTenant } from '@/lib/fusionauth-dal';
import TenantTabs from './tenant-tabs';
import Link from 'next/link';

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenantId: string, applicationId: string }>
}) {
  const paramList = await params;
  const tenantId = paramList?.tenantId;
  const tenant = await getTenant(tenantId);

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          <Link href={`/tenants/${tenantId}/applications`}>{tenant.name}</Link>
        </h2>
        <p className="text-muted-foreground">
          Manage tenant settings and applications
        </p>
      </div>
      <TenantTabs />
      {children}
    </div>
  );
}