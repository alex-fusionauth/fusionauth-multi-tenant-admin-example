import 'server-only'
import { createRemoteJWKSet, jwtVerify } from 'jose';

// Validate the token signature, make sure it wasn't expired
export const validateUser = async (userTokenCookie: string | undefined) => {
    // Make sure the user is authenticated.
    if (!userTokenCookie) {
        return false;
    }
    try {
        // const secret = new TextEncoder().encode(process.env.FUSIONAUTH_CLIENT_SECRET!);
        const JWKS = createRemoteJWKSet(new URL(`${process.env.NEXT_PUBLIC_FUSIONAUTH_URL}/.well-known/jwks.json`))

        const { payload } = await jwtVerify(userTokenCookie, JWKS, {
            issuer: 'fusionauth',
            audience: process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID,
        });
        return payload;
    } catch (err) {
        console.error(err);
        return false;
    }
}