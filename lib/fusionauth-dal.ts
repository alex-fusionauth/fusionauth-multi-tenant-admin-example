import 'server-only'

import { cookies } from 'next/headers'
import { validateUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { JWTPayload } from 'jose';

import { FusionAuthClient } from '@fusionauth/typescript-client';

export interface SessionPayload extends JWTPayload {
    roles?: string[];
}

class FusionAuthClientWithSession extends FusionAuthClient {
    private session: SessionPayload | null = null;
    private redirectPath: string;

    constructor(apiKey: string, baseUrl: string, redirectPath = '/auth/login') {
        super(apiKey, baseUrl);
        this.redirectPath = redirectPath;
    }


    private async ensureSession() {
        if (this.session) return; // Session already verified
        try {

            const app_at = (await cookies()).get('app.at')?.value;
            const session = await validateUser(app_at);

            if (!session || !session.sub) {
                redirect(this.redirectPath); // Redirect if session is invalid
                // Following line prevents type errors; redirect ensures it's never reached
                return;
            }
            this.session = session as SessionPayload;
        } catch (error) {
            console.error("Error during session verification:", error);
            redirect(this.redirectPath);
        }
    }

    private cachedRetrieveTenants = cache(super.retrieveTenants.bind(this));  // Correct binding
    public async retrieveTenants() {
        await this.ensureSession();
        return this.cachedRetrieveTenants();
    }

    private cachedRetrieveTenant = cache(super.retrieveTenant.bind(this)); // Correct binding
    public async retrieveTenant(tenantId: string) {
        await this.ensureSession();
        return this.cachedRetrieveTenant(tenantId);
    }


    private cachedRetrieveApplications = cache(super.retrieveApplications.bind(this));
    public async retrieveApplications() {
        await this.ensureSession();
        return this.cachedRetrieveApplications();
    }

    private cachedRetrieveApplication = cache(super.retrieveApplication.bind(this));
    public async retrieveApplication(applicationId: string) {
        await this.ensureSession();
        return this.cachedRetrieveApplication(applicationId);
    }
}


export const client = new FusionAuthClientWithSession(process.env.FUSIONAUTH_API_KEY!, process.env.NEXT_PUBLIC_FUSIONAUTH_URL!)


//User

// export const getUsersByTenant = cache(async (tenantId?: string) => {
//     const options = tenantId ? { headers: new Headers({ 'X-FusionAuth-TenantId': tenantId }) } : undefined;
//     return (await handleFusionAuthRequest('/api/user/search?queryString=*', options))?.users;
// });

// export const getUsersByApplication = cache(async (applicationId: string) => {
//     const options: RequestInit = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             search: {
//                 numberOfResults: 50,
//                 query: `{"bool":{"must":[{"nested":{"path":"registrations","query":{"bool":{"must":[{"match":{"registrations.applicationId":"${applicationId}"}}]}}}}]}}`,
//                 startRow: 0,
//             },
//         }),
//     };

//     return (await handleFusionAuthRequest<{ users: any[] }>('/api/user/search', options))?.users;
// });