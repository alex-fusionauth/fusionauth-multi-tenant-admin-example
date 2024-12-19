'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function TenantTabs() {
    const params = useParams();
    const basePath = `/users/${params.userId}`;
    const pathname = usePathname();

    return (
        !params?.applicationId &&
        <Tabs value={pathname} className="space-y-4">
            <TabsList>
                <TabsTrigger value={`${basePath}/registrations`} asChild>
                    <Link href={`${basePath}/registrations`}>Registrations</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/multi-factor`} asChild>
                    <Link href={`${basePath}/multi-factor`}>Multi-Factor</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/passkeys`} asChild>
                    <Link href={`${basePath}/passkeys`}>Passkeys</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/families`} asChild>
                    <Link href={`${basePath}/families`}>Families</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/linked-accounts`} asChild>
                    <Link href={`${basePath}/linked-accounts`}>Linked Accounts</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/groups`} asChild>
                    <Link href={`${basePath}/groups`}>Groups</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/entity-grants`} asChild>
                    <Link href={`${basePath}/entity-grants`}>Entity Grants</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/recent-logins`} asChild>
                    <Link href={`${basePath}/recent-logins`}>Recent Logins</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/consent`} asChild>
                    <Link href={`${basePath}/consent`}>Consent</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/sessions`} asChild>
                    <Link href={`${basePath}/sessions`}>Sessions</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/current-actions`} asChild>
                    <Link href={`${basePath}/current-actions`}>Current Actions</Link>
                </TabsTrigger>
                <TabsTrigger value={`${basePath}/history`} asChild>
                    <Link href={`${basePath}/history`}>History</Link>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}