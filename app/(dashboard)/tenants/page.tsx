import { client } from '@/lib/fusionauth-dal';
import LinkTable from '@/components/link-table';
import TenantsBreadcrumb from './tenants-breadcrumb';


export default async function Tenants() {
  client.setTenantId(null);
  const tenants = (await client.retrieveTenants()).response.tenants;
  return (
    <div
      className="flex flex-col w-full"
    >
      <TenantsBreadcrumb />
      {tenants ? <LinkTable linkBase='tenants' linkPath='/applications' data={tenants} head={['Name', 'Id']} /> : <div>No Tenants Found...</div>}
    </div>
  );
}
