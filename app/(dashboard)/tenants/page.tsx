import { getTenants } from '@/lib/fusionauth-dal';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import LinkTable from '@/components/link-table';


export default async function Tenants() {
  const tenants = await getTenants();
  return (
    <div
      className="flex flex-col w-full"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tenants</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <LinkTable linkBase='tenants' linkPath='/applications' data={tenants} head={['Name', 'Id']} />
    </div>
  );
}
