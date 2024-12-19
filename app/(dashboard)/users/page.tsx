import { client } from '@/lib/fusionauth-dal';
import LinkTable from '@/components/link-table';
import UsersBreadcrumb from './users-breadcrumb';
import { Sort } from '@fusionauth/typescript-client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Pencil, Copy, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default async function Tenants() {
  client.setTenantId(null);
  const users = (await client.searchUsersByQuery({
    search: {
      queryString: `*`,
      numberOfResults: 25,
      sortFields: [
        { name: 'login', order: Sort.asc },
        { name: 'fullName', order: Sort.asc },
      ]
    },
  })).response.users;

  //TODO: Map unique first
  const usersWithTenant = await Promise.all(
    users?.map(async (user) => {
      const resp = await client.retrieveTenant(user.tenantId as string);
      return {
        ...user,
        tenant: resp.response.tenant,
      };
    }) || []
  );
  console.log(usersWithTenant)
  const action =
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[100px]">
          Select
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  return (
    <div
      className="flex flex-col w-full gap-2"
    >
      <UsersBreadcrumb />
      {usersWithTenant ?
        <LinkTable
          linkBase='users'
          linkPath='/registrations'
          data={usersWithTenant}
          head={['Login', 'Name', 'Username', 'Tenant', 'Created']}
          fields={['email', 'fullName', 'username', 'tenant.name', 'insertInstant']}
          action={action}
        />
        :
        <div>No Tenants Found...</div>}
    </div>
  );
}
