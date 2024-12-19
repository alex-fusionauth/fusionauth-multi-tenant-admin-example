import { client } from '@/lib/fusionauth-dal';
import ApplicationUsersTable from './app-users-table';

export default async function Users({
  params,
}: {
  params: Promise<{ tenantId: string, applicationId: string }>
}) {
  const tenantId = (await params).tenantId;
  const applicationId = (await params).applicationId;
  const users = (await client.searchUsersByQuery({
    search: {
      query: `{"bool":{"must":[{"nested":{"path":"registrations","query":{"bool":{"must":[{"match":{"registrations.applicationId":"${applicationId}"}}]}}}}]}}`
    },
  })).response.users;

  return (
    <div
      className="flex flex-col w-full gap-2 md:gap-4"
    >
      {users ?

        <ApplicationUsersTable users={users} />
        : 'No Applications Found.'}
    </div>
  );
}
