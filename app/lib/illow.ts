'use server';

import { Tenant, TenantCreation } from "./definitions";

const apiKey = process.env.ILLOW_API_KEY as string;

export const createTenant = async (tenantCreation: TenantCreation): Promise<Tenant> => {
  const response = await fetch(
    'https://api.platform.illow.io/open-api/v1/company/tenants',
    {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(tenantCreation),
    },
  );

  if (response.status > 300) throw new Error((await response.json()).message);

  return response.json();
}