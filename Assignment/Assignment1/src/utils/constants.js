export const ROLES = {
  ADMIN: 1,
  STAFF: 2,
};

export const STATUS_OPTIONS = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

export const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Categories", path: "/categories" },
  { label: "News", path: "/news" },
  { label: "Users", path: "/users", roles: [ROLES.ADMIN] },
  { label: "Profile", path: "/profile" },
  { label: "Settings", path: "/settings", roles: [ROLES.ADMIN] },
];
