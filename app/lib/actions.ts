'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { createTenant } from './illow';
import { Tenant } from './definitions';

const samlMetadataUrl = process.env.AUTH0_SAML_METADATAURL as string;
const claimEmail = process.env.AUTH0_SAML_CLAIM_EMAIL as string;
const claimName = process.env.AUTH0_SAML_CLAIM_EMAIL as string;

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
      saml: {
        metadataUrl: samlMetadataUrl,
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