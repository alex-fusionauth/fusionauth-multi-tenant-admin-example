import { getTenants } from '@/lib/fusionauth-dal';
import LinkTable from '@/components/link-table';
import TenantsBreadcrumb from './tenants-breadcrumb';


export default async function Tenants() {
  const tenants = await getTenants();
  return (
    <div
      className="flex flex-col w-full"
    >
      <TenantsBreadcrumb />
      <LinkTable linkBase='tenants' linkPath='/applications' data={tenants} head={['Name', 'Id']} />
    </div>
  );
}
