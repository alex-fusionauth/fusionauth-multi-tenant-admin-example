import { client } from "@/lib/fusionauth-dal";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const navigation = (await client.isSuperAdmin())
    ? [
      'Tenants',
      'Users',
      'Groups',
      'Customizations',
      'Entity Management',
      'Settings',
      'Reports',
      'System',
    ]
    : ['Tenants',];

  return (
    <main className="flex-1 overflow-y-auto">
      <TopNav />
      <div className='flex'>
        <SideNav navigation={navigation} />
        <section className="flex flex-col w-full p-4">
          {children}
        </section>
      </div>
    </main>
  );
}