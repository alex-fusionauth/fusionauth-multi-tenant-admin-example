import { client } from '@/lib/fusionauth-dal';
import ApplicationTabs from '../application-tabs';
import ApplicationBreadcrumb from '../application-breadcrumb';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default async function Users({
  params,
}: {
  params: Promise<{ tenantId: string, applicationId: string }>
}) {
  const tenantId = (await params).tenantId;
  const applicationId = (await params).applicationId;
  const application = (await client.retrieveApplication(tenantId)).response.application;
  return (
    <div
      className="flex flex-col w-full gap-2 md:gap-4"
    >
      <ApplicationBreadcrumb tenantId={tenantId} applicationId={applicationId} />
      <ApplicationTabs />
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
              <code className="language-json">{JSON.stringify(application, null, 2)}</code>
            </pre>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
