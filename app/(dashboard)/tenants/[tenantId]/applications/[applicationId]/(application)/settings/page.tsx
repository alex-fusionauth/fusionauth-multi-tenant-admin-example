export default async function Users({
  params,
}: {
  params: Promise<{ tenantId: string, applicationId: string }>
}) {

  return (
    <div
      className="flex flex-col w-full gap-2 md:gap-4"
    >
      Settings
    </div>
  );
}
