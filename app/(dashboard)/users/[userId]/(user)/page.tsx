import { redirect } from 'next/navigation'

export default async function User({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId;
  redirect(`/users/${userId}/registrations`)
}
