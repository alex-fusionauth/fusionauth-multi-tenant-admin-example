import { client } from '@/lib/fusionauth-dal';
import UserBreadcrumb from './user-breadcrumb';
import UserProfile from './user-profile';
import UserTabs from './user-tabs';

export default async function TabsLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId;

  const isSuperAdmin = await client.isSuperAdmin();

  return (
    <div
      className="flex flex-col w-full gap-2 md:gap-4"
    >
      {isSuperAdmin && <UserBreadcrumb userId={userId} />}
      <UserProfile userId={userId} />
      <UserTabs />
      {children}
    </div>
  );
}
