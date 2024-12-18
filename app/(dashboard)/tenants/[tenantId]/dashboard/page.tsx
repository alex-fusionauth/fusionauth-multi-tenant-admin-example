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

import { client } from '@/lib/fusionauth-dal';
import { Button } from '@/components/ui/button';
import TenantBreadcrumb from '../tenant-breadcrumb';
import TenantTabs from '../tenant-tabs';

// TODO: Update misssing TODOs

export default async function TenantDashboard({
    params,
}: {
    params: Promise<{ tenantId: string }>
}) {
    const tenantId = (await params).tenantId;
    const tenant = (await client.retrieveTenant(tenantId)).response.tenant;

    return (
        <>
            {!tenant ? (<div>Tenant not found</div>) : (
                <div
                    className="flex flex-col w-full gap-2 md:gap-4"
                >
                    <TenantBreadcrumb tenantId={tenantId} />
                    <TenantTabs />
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">View JSON</Button>
                            </DialogTrigger>
                            <DialogContent className=''>
                                <DialogHeader>
                                    <DialogTitle>JSON Details</DialogTitle>
                                </DialogHeader>
                                <pre className='max-h-[80vh] overflow-y-scroll'>
                                    <code className="language-json">{JSON.stringify(tenant, null, 2)}</code>
                                </pre>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Field</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>{tenant.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Issuer</TableCell>
                                        <TableCell>{tenant.issuer}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Created</TableCell>
                                        <TableCell>{tenant.insertInstant}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Last Updated</TableCell>
                                        <TableCell>{tenant.lastUpdateInstant}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Theme Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Field</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>{tenant.themeId}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell><div className='bold text-red-500'>TODO</div></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Form Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Field</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Admin User Form Id</TableCell>
                                        <TableCell>{tenant.formConfiguration?.adminUserFormId}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Username Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Field</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Unique usernames enabled</TableCell>
                                        <TableCell>{tenant.usernameConfiguration?.unique?.enabled ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Connector Policies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Connector</TableHead>
                                        <TableHead>Domains</TableHead>
                                        <TableHead>Migrate User</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tenant?.connectorPolicies?.map((connectorPolicy: any) => (
                                        <TableRow key={connectorPolicy.connectorId}>
                                            <TableCell>{connectorPolicy.connectorId}</TableCell>
                                            <TableCell>{connectorPolicy.domains.join(', ')}</TableCell>
                                            <TableCell>{connectorPolicy.migrate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>SMTP Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Field</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Host</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.host}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Port</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.port}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Username</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.username ? tenant.emailConfiguration?.username : '-'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Password</TableCell>
                                        <TableCell>The password is not viewable</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Security</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.security}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Default from email</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.defaultFromEmail}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Default from name</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.defaultFromName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Additoinal email headers</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.additionalHeaders ? tenant.emailConfiguration?.additionalHeaders?.join(', ') : '-'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Email Verification Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Field</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Verify Email</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.verifyEmail ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Allow implicit email verification</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.implicitEmailVerificationAllowed ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Verify email when changed</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.verifyEmailWhenChanged ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Verification email template Id</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.verificationEmailTemplateId}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Verification complete email template Id</TableCell>
                                        <TableCell><div className='bold text-red-500'>TODO</div></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email verification strategy</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.verificationStrategy}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Unverified email behavior</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.unverified?.behavior}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Allow email change when gated</TableCell>
                                        <TableCell>{tenant.emailConfiguration?.unverified?.allowEmailChangeWhenGated ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Delete unverified users</TableCell>
                                        <TableCell>{tenant.userDeletePolicy?.unverified?.enabled ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Delete after (in days)</TableCell>
                                        <TableCell>{tenant.userDeletePolicy?.unverified?.numberOfDaysToRetain}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Additional properties</TableCell>
                                        <TableCell><div className='bold text-red-500'>TODO</div></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}