'use client';

import { cn } from '@/lib/utils';
import {
  Users,
  Settings,
  BarChart3,
  Building2,
  Group,
  Palette,
  Database,
  FileText,
  Monitor,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Tenants', href: '/tenants', icon: Building2 },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Groups', href: '/groups', icon: Group },
  { name: 'Customizations', href: '/customizations', icon: Palette },
  { name: 'Entity Management', href: '/entities', icon: Database },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'System', href: '/system', icon: Monitor },
];

export function SideNav() {
  const pathname = usePathname();
  // Filter navigation items based on user roles
  const filteredNavigation = navigation.filter((item) => {
    // Add your role-based logic here
    return true; // Placeholder - implement actual role checks
  });

  return (
    <nav className="flex flex-col w-64 border-r bg-background">
      <div className="space-y-1 p-4">
        {filteredNavigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}