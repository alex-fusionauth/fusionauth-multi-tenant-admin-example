import Link from 'next/link';
import UserAvatar from './user-avatar';

export function TopNav() {
  return (
    <header className="h-16 border-b bg-background">
      <div className="flex h-full items-center justify-between px-6">
        <div className="text-xl font-bold">
          <Link href="/">FusionAuth Multi-Tenant Admin</Link>
        </div>
        <div className='flex items-center gap-1'>
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}