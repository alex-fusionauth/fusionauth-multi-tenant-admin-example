import { client } from "@/lib/fusionauth-dal";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Pencil, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TabsLayout({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId;
  const { user } = (await client.retrieveUser(userId)).response;

  const registrationsWithAppData = await Promise.all(
    user?.registrations?.map(async (registration) => {
      const applicationResponse = await client.retrieveApplication(registration.applicationId as string);
      return {
        ...registration,
        application: applicationResponse.response.application,
      };
    }) || []
  );


  return (
    <div
      className="flex flex-col w-full"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Application</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last updated</TableHead>
            <TableHead>Last login</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user?.twoFactor ?
            <>
              {registrationsWithAppData?.map(registration => (
                <TableRow key={registration.applicationId}>
                  <TableCell >
                    <Link href={`/tenants/${registration.application?.tenantId}/applications/${registration.applicationId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {registration.application?.name || '(empty)'}
                    </Link>
                  </TableCell>
                  <TableCell >
                    {registration.username || '-'}
                  </TableCell>
                  <TableCell >
                    {registration.roles?.join(', ')}
                  </TableCell>
                  <TableCell >
                    {registration.insertInstant ? new Date(registration.insertInstant).toLocaleString() : '-'}
                  </TableCell>
                  <TableCell >
                    {registration.lastUpdateInstant ? new Date(registration.lastUpdateInstant).toLocaleString() : '-'}
                  </TableCell>
                  <TableCell >
                    {registration.lastLoginInstant ? new Date(registration.lastLoginInstant).toLocaleString() : '-'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[100px]">
                          Select
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </>
            :
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No methods have been configured
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </div>
  );
}
