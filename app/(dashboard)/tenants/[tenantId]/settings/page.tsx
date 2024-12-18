import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { getTenant } from '@/lib/fusionauth-dal';
import { Button } from '@/components/ui/button';
import TenantBreadcrumb from '../breadcrumb';
import TenantTabs from '../tenant-tabs';

// TODO: Update misssing TODOs

export default async function TenantDashboard({
    params,
}: {
    params: Promise<{ tenantId: string }>
}) {
    const tenantId = (await params).tenantId;
    const tenant = await getTenant(tenantId);

    return (
        <div
            className="flex flex-col w-full gap-2 md:gap-4"
        >
            <TenantBreadcrumb tenantId={tenantId} />
            <TenantTabs />
        </div>
    );
}