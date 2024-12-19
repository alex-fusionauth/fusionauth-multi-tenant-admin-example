import 'server-only'

import { cookies } from 'next/headers'
import { validateUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { JWTPayload } from 'jose';

import { FusionAuthClient, UUID } from '@fusionauth/typescript-client';

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

    //TODO: Do we care about sessions on API calls??

    private async ensureSession() {
        // if (this.session) return; // Session already verified
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

    private roleValidation(service: string, resource: string | UUID | null | undefined, action: string): boolean {
        if (resource === null || resource === undefined) return false;

        if (!this.session || !this.session.roles) return false;

        const roles = this.session.roles;

        if (roles.includes('*:*:*')) return true; // Super admin bypass
        const resourceString = resource ? resource.toString() : null;

        const hasResourceAccess = resourceString && roles.some(role => role === `${service}:${resourceString}:*` || role === `${service}:${resourceString}:${action}`);
        if (hasResourceAccess) return true;

        return roles.includes(`${service}:*:*`) || roles.includes(`${service}:*:${action}`);

    }


    // Tenants

    public async retrieveTenants() {
        await this.ensureSession();

        const cached = await cache(async () => {
            console.log('cache miss')
            const resp = await super.retrieveTenants();
            const tenants = resp?.response?.tenants?.filter(tenant => this.roleValidation('tenant', tenant?.id, 'view'));
            resp.response.tenants = tenants;
            return resp;
        })();
        return cached;
    }

    private cachedRetrieveTenant = cache(super.retrieveTenant.bind(this)); // Correct binding
    public async retrieveTenant(tenantId: string) {
        await this.ensureSession();
        return this.cachedRetrieveTenant(tenantId);
    }

    // Applications
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

    // Users
    private cachedRetrieveUser = cache(super.retrieveUser.bind(this));
    public async retrieveUser(userId: UUID) {
        await this.ensureSession();
        return this.cachedRetrieveUser(userId);
    }
}


export const client = new FusionAuthClientWithSession(process.env.FUSIONAUTH_API_KEY!, process.env.NEXT_PUBLIC_FUSIONAUTH_URL!)