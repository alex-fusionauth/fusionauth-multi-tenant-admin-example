import { SideNav } from "@/components/side-nav";
import { TopNav } from "@/components/top-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 overflow-y-auto">
      <TopNav />
      <div className='flex'>
        <SideNav />
        <section className="flex flex-col w-full p-4">
          {children}
        </section>
      </div>
    </main>
  );
}