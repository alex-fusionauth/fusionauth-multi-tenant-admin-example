import { decodeJwt, type JWTPayload } from 'jose';
import { cookies } from 'next/headers'

interface JWTPayloadExtended extends JWTPayload {
  roles: string[];
}


export default async function UserRoles() {

  const app_at = (await cookies()).get('app.at')?.value;
  const jwt = app_at ? await decodeJwt<JWTPayloadExtended>(app_at) : undefined;

  return (
    <ul>
      {jwt?.roles?.map(role => <li key={role}>{role}</li>)}
    </ul>
  )
}