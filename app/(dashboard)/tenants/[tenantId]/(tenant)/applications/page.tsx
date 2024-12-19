import { client } from '@/lib/fusionauth-dal';
import LinkTable from '@/components/link-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Pencil, Copy, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Applications({
  params,
}: {
  params: Promise<{ tenantId: string }>
}) {
  const tenantId = (await params).tenantId;
  client.setTenantId(tenantId); //TODO: This seems like an API bug.
  const applications = (await client.retrieveApplications()).response.applications;

  const action =
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

  return (
    <div
      className="flex flex-col w-full gap-2 md:gap-4"
    >
      {applications ?
        <LinkTable
          linkBase={`tenants/${tenantId}/applications`}
          linkPath='/users'
          data={applications}
          head={['Name', 'Id']}
          fields={['name', 'id']}
          action={action}
        />
        : 'No Applications Found.'}
    </div>
  );
}
