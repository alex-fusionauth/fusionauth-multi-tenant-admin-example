import { redirect } from 'next/navigation'

export default async function Application({
  params,
}: {
  params: Promise<{ tenantId: string; }>
}) {
  const tenantId = (await params).tenantId;
  redirect(`/tenants/${tenantId}/applications`)
}
