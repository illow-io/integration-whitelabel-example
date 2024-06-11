export interface Claims {
  mail: string;
  name: string;
}

export interface SAML {
  claims: Claims;
  metadataUrl: string;
}

export interface OIDC {
  claims: Claims;
  clientId: string;
  clientSecret: string;
  issuer: string;
}

export interface SSO {
  saml?: SAML;
  oidc?: OIDC;
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