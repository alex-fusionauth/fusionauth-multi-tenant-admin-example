'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function TenantTabs() {
    const params = useParams();
    const basePath = `/tenants/${params.tenantId}`;
    const pathname = usePathname();

    return (
        !params?.applicationId &&
        <Tabs value={pathname} className="space-y-4">
            <TabsList>
                <TabsTrigger value={`${basePath}/dashboard`} asChild>
                    <Link href={`${basePath}/dashboard`}>Dashboard</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/applications`} asChild>
                    <Link href={`${basePath}/applications`}>Applications</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/settings`} asChild>
                    <Link href={`${basePath}/settings`}>Settings</Link>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}