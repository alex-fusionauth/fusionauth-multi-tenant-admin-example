import 'server-only'

import { cookies } from 'next/headers'
import { validateUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { JWTPayload } from 'jose';

export interface SessionPayload extends JWTPayload {
    roles?: string[];
}

export const verifySession = cache(async () => {
    const app_at = (await cookies()).get('app.at')?.value;
    const session = await validateUser(app_at);

    if (!session) {
        redirect('/auth/login')
    }

    if (!session?.sub) {
        redirect('/auth/login')
    }

    return { isAuth: true, ...session } as unknown as SessionPayload;
});

export const callFusionAuth = (path: string, options?: RequestInit) => {
    const headers = new Headers({ 'Authorization': process.env.FUSIONAUTH_API_KEY! });

    if (options?.headers) {
        // @ts-ignore: ugh
        options.headers.forEach((value, key) => {
            headers.append(key, value)
        });
    }

    return fetch(process.env.NEXT_PUBLIC_FUSIONAUTH_URL! + path, {
        ...options,
        headers,

    })
}

export const getTenants = cache(async () => {
    const session = await verifySession();
    if (!session) return [];

    try {
        const resp = await callFusionAuth('/api/tenant');

        if (resp.ok) {
            return (await resp.json()).tenants;
        } else {
            console.error("Error retrieving tenants:", `${resp.status}: ${resp.statusText}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
})

export const getTenant = cache(async (tenantId: string) => {
    const session = await verifySession();
    if (!session) return [];

    try {
        const resp = await callFusionAuth('/api/tenant/' + tenantId);

        if (resp.ok) {
            return (await resp.json()).tenant;
        } else {
            console.error("Error retrieving tenants:", `${resp.status}: ${resp.statusText}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
})

export const getApplications = cache(async (tenantId?: string) => {
    const session = await verifySession();
    if (!session) return [];

    try {
        const resp = tenantId ?
            await callFusionAuth('/api/application', {
                headers: new Headers({ 'X-FusionAuth-TenantId': tenantId })
            }) :
            await callFusionAuth('/api/application');
        if (resp.ok) {
            return (await resp.json()).applications;
        } else {
            console.error("Error retrieving applications:", `${resp.status}: ${resp.statusText}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
})