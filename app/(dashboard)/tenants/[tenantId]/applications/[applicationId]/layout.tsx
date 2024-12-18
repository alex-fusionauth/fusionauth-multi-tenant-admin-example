import { getTenant } from '@/lib/fusionauth-dal';
import ApplicationTabs from './application-tabs';
import Link from 'next/link';

export default async function ApplicationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenantId: string }>
}) {
  const tenantId = (await params).tenantId;
  const tenant = await getTenant(tenantId);

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          <Link href={`/tenants/${tenantId}/applications`}>Applicatoin Name</Link>
        </h2>
        <p className="text-muted-foreground">
          Manage application settings and users
        </p>
      </div>
      <ApplicationTabs />
      {children}
    </div>
  );
}