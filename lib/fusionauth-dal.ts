import 'server-only'

import { cookies } from 'next/headers'
import { validateUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { JWTPayload } from 'jose';

import { FusionAuthClient, SearchRequest, UUID } from '@fusionauth/typescript-client';

export interface SessionPayload extends JWTPayload {
    roles?: string[];
}

//TODO: Maybe we should use fetch to take advantage of caching https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#caching-data-with-an-orm-or-database

export enum Service {
    SuperAdmin = '*',
    Tenant = 'tenant',
    Application = 'application',
    User = 'user',
}

export enum Action {
    SuperAdmin = '*',
    View = 'view',
    Create = 'create',
    Update = 'update',
    Delete = 'delete',
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
        // if (this.session) return; // Session already verified **removed as it is being cached in memory**
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
        }
        return false;
    }

    private roleValidation(service: Service, resource: string | UUID | null | undefined, action: Action): boolean {
        if (resource === null || resource === undefined) return false;

        if (!this.session || !this.session.roles) return false;

        const roles = this.session.roles;

        if (roles.includes('*:*:*')) return true; // Super admin bypass
        const resourceString = resource ? resource.toString() : null;

        const hasResourceAccess = resourceString && roles.some(role => role === `${service}:${resourceString}:*` || role === `${service}:${resourceString}:${action}`);
        if (hasResourceAccess) return true;

        return roles.includes(`${service}:*:*`) || roles.includes(`${service}:*:${action}`);

    }

    public async isSuperAdmin() {
        await this.ensureSession();
        return this.roleValidation(Service.SuperAdmin, '*', Action.SuperAdmin)
    }

    // Tenants
    public async retrieveTenants() {
        await this.ensureSession();
        const resp = await super.retrieveTenants();
        resp.response.tenants = resp?.response?.tenants?.filter(f => this.roleValidation(Service.Tenant, f?.id, Action.View));
        return resp;
    }

    public async retrieveTenant(tenantId: UUID) {
        await this.ensureSession();
        const resp = await super.retrieveTenant(tenantId);
        resp.response.tenant = this.roleValidation(Service.Tenant, resp?.response?.tenant?.id, Action.View) ?
            resp.response.tenant : undefined;
        return resp;
    }

    // Applications
    public async retrieveApplications() {
        await this.ensureSession();
        const resp = await super.retrieveApplications();
        resp.response.applications = resp?.response?.applications?.filter(f => this.roleValidation(Service.Application, f?.id, Action.View));
        return resp;
    }

    public async retrieveApplication(applicationId: UUID) {
        await this.ensureSession();
        const resp = await super.retrieveApplication(applicationId);
        resp.response.application = this.roleValidation(Service.Application, resp?.response?.application?.id, Action.View) ?
            resp.response.application : undefined;
        return resp;
    }

    // Users
    // TODO: Tried with 1M users and too slow!
    public async searchUsersByQuery(request: SearchRequest) {
        await this.ensureSession();
        const resp = await super.searchUsersByQuery(request);

        const users = resp?.response?.users ?? [];

        // // While resp.response.nextResults exists recursively call super.searchUsersByQuery
        // let nextResults = resp.response.nextResults;

        // while (nextResults) {
        //     const nextResp = await super.searchUsersByQuery({
        //         search: {
        //             numberOfResults: 10000,
        //             nextResults: resp.response.nextResults
        //         }
        //     });
        //     users.push(...nextResp?.response?.users ?? []);
        //     nextResults = nextResp.response.nextResults;
        // }

        // Filter roles
        resp.response.users = users?.filter(f => this.roleValidation(Service.Tenant, f?.tenantId, Action.View)); // Only Users in Tenant
        resp.response.users = users?.filter(f => this.roleValidation(Service.User, f?.id, Action.View)); // Must have role to see users

        return resp;
    }


    // public async searchUsersByTenantQuery(tenantId: UUID, request: SearchRequest) {
    //     await this.ensureSession();

    //     // Validate that the current user can access this tenant
    //     const allowedTenants = (await this.retrieveTenants()).response.tenants;
    //     if (!allowedTenants?.find(f => f?.id === tenantId)) {
    //         return {
    //             response: {
    //                 users: []
    //             }
    //         }
    //     }

    //     request.search = {
    //         ...request.search,
    //         queryString: `${request.search?.queryString ?? '*'} AND tenantId:${tenantId}`
    //     }
    //     return await super.searchUsersByQuery(request);
    // }

    public async retrieveUser(userId: UUID) {
        await this.ensureSession();
        const resp = await super.retrieveUser(userId);
        resp.response.user = this.roleValidation(Service.User, resp?.response?.user?.id, Action.View) ?
            resp.response.user : undefined;
        return resp;
    }

}
export const client = new FusionAuthClientWithSession(process.env.FUSIONAUTH_API_KEY!, process.env.NEXT_PUBLIC_FUSIONAUTH_URL!)