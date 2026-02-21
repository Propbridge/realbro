export const ROLES = ["superAdmin", "admin", "viewer", "customerSupport"] as const;

export type Role = typeof ROLES[number];

export const PERMISSIONS = [
    "dashboard.view",

    "properties.view",
    "properties.create",
    "properties.edit",
    "properties.delete",
    "properties.approve",       // Exclusive Approval
  
    "users.view",
    "users.create",
    "users.edit",
    "users.delete",
  
    "appointments.view",
    "appointments.manage",
  
    "requirements.view",
    "requirements.manage",
  
    "financials.view",
    "financials.manage",
  
    "banners.view",
    "banners.manage",
  
    "roles.view",
    "roles.manage",

    "tickets.view",            
    "tickets.respond",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  superAdmin: [...PERMISSIONS],

  admin: [
    "dashboard.view",
    "properties.view", "properties.create", "properties.edit", "properties.delete",
    "properties.approve",
    "users.view", "users.create", "users.edit", "users.delete",
    "appointments.view", "appointments.manage",
    "requirements.view", "requirements.manage",
    "financials.view", "financials.manage",
    "banners.view", "banners.manage",
    // NO roles.view, roles.manage
  ],

  viewer: [
    "dashboard.view",
    "properties.view",
    "users.view",
    "requirements.view",
  ],

  customerSupport: [
    "dashboard.view",
    "tickets.view", "tickets.respond",
  ],
};

export function hasPermission(role: Role,permission: Permission): boolean {
    return ROLE_PERMISSIONS[role].includes(permission);
}

export function hasAnyPermission(role: Role,permissions: Permission[]): boolean{
    return permissions.some((p) => ROLE_PERMISSIONS[role].includes(p));
}