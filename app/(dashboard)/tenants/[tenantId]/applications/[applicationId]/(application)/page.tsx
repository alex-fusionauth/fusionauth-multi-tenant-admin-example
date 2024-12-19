import { redirect } from 'next/navigation'

export default async function Application({
  params,
}: {
  params: Promise<{ tenantId: string; applicationId: string }>
}) {
  const tenantId = (await params).tenantId;
  const applicationId = (await params).applicationId;
  redirect(`/tenants/${tenantId}/applications/${applicationId}/users`)
}
