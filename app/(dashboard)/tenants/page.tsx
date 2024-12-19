import { client } from '@/lib/fusionauth-dal';
import TenantsTable from './tenants-table';
import TenantsBreadcrumb from './tenants-breadcrumb';


export default async function Tenants() {
  client.setTenantId(null);
  const tenants = (await client.retrieveTenants()).response.tenants;

  return (
    <div
      className="flex flex-col w-full gap-2"
    >
      <TenantsBreadcrumb />
      {tenants ?
        <TenantsTable tenants={tenants} />
        :
        <div>No Tenants Found...</div>}
    </div>
  );
}
