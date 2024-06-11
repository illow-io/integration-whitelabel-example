'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { createTenant } from './illow';
import { Tenant } from './definitions';

const oidcClientId = process.env.AUTH0_CLIENT_ID as string;
const oidcClientSecret = process.env.AUTH0_CLIENT_SECRET as string;
const oidcIssuer = process.env.AUTH0_ISSUER_BASE_URL as string;
const claimEmail = process.env.AUTH0_CLAIM_EMAIL as string;
const claimName = process.env.AUTH0_CLAIM_NAME as string;

const TenantCreationSchema = z.object({
  internalId: z.string(),
  domain: z.string().url(),
  email: z.string().email(),
});
 
const sanitizeURL = (url: FormDataEntryValue | null) => {
  if (!url || typeof url !== 'string') return url;
  return url.startsWith('http') ? url : `http://${url}`;
}

export async function enableCMP(internalId: string, email: string, formData: FormData) {
  const tenantCreation = TenantCreationSchema.parse({
    internalId,
    domain: sanitizeURL(formData.get('domain')),
    email,
  });

  const tenant = await createTenant({
    tenantName: tenantCreation.internalId, // this should be a company or group name
    domain: tenantCreation.domain,
    tenantMembers: [{ email: tenantCreation.email, role: 'admin' }], // this should have all tenant members
    sso: {
      oidc: {
        clientId: oidcClientId,
        clientSecret: oidcClientSecret,
        issuer: oidcIssuer,
        claims: {
          mail: claimEmail,
          name: claimName,
        },
      },
    },
  });

  await sql`
    INSERT INTO my_tenants (id, illowTenantId, illowLoginUrl)
    VALUES (${tenantCreation.internalId}, ${tenant.tenantId}, ${tenant.loginUrl})
    ON CONFLICT(id) 
    DO UPDATE SET
      illowTenantId = ${tenant.tenantId},
      illowLoginUrl = ${tenant.loginUrl};
  `;

  revalidatePath('/consent-manager');
}

export async function fetchCMP(id: string): Promise<Tenant | undefined> {
  const query = await sql`SELECT * from my_tenants where id = ${id}`;
  const rawRow = query.rows[0];
  if (!rawRow) return rawRow;

  return {
    tenantId: rawRow.illowtenantid,
    loginUrl: rawRow.illowloginurl,
  }
}