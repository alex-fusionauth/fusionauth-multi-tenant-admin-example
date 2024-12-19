import { client } from "@/lib/fusionauth-dal";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function TabsLayout({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId;
  const { user } = (await client.retrieveUser(userId)).response;
  return (
    <div
      className="flex flex-col w-full"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Method</TableHead>
            <TableHead>Transport</TableHead>
            <TableHead>Identifier</TableHead>
            <TableHead>Last used</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user?.twoFactor ?
            <TableRow>

            </TableRow>
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
