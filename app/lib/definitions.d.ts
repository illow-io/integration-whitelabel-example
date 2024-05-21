export interface SAMLClaims {
  mail: string;
  name: string;
}

export interface SAML {
  metadataUrl: string;
  claims: SAMLClaims;
}

export interface SSO {
  saml: SAML;
}

export interface TenantMember {
  email: string;
  role: 'admin' | 'user';
}

export interface TenantCreation {
  tenantName: string;
  domain?: string;
  sso: SSO;
  tenantMembers: Array<TenantMember>;
};

export interface Tenant {
  tenantId: string;
  loginUrl: string;
}