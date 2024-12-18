import { getTenants } from '@/lib/fusionauth-dal';
import DataTable from './data-table';

export default async function Tenants() {
  const tenants = await getTenants();
  return (
    <div
      className="flex flex-col w-full"
    >
      <DataTable data={tenants} />
    </div>
  );
}
