import { client } from '@/lib/fusionauth-dal';
import UsersBreadcrumb from './users-breadcrumb';
import UsersTable from './users-table';
import { Sort, Tenant } from '@fusionauth/typescript-client';


export default async function Users() {

  client.setTenantId(null);
  const users = (await client.searchUsersByQuery({
    search: {
      queryString: `*`,
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
        tenant: resp.response.tenant as Tenant,
      };
    }) || []
  );

  return (
    <div
      className="flex flex-col w-full gap-2"
    >
      <UsersBreadcrumb />
      {usersWithTenant && <UsersTable usersWithTenant={usersWithTenant} />}
    </div>
  );
}
