'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function ApplicationTabs() {
    const params = useParams();
    const basePath = `/tenants/${params.tenantId}/applications/${params.applicationId}`;
    const pathname = usePathname();

    return (
        <Tabs value={pathname} className="space-y-4">
            <TabsList>
                <TabsTrigger value={`${basePath}/dashboard`} asChild>
                    <Link href={`${basePath}/dashboard`}>Dashboard</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/users`} asChild>
                    <Link href={`${basePath}/users`}>Users</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/settings`} asChild>
                    <Link href={`${basePath}/settings`}>Settings</Link>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}