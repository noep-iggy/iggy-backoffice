export const API_ROUTES = {
  auth: {
    login: '/auth/login',
  },
  users: {
    me: '/user',
    update: '/user',
    delete: '/user',
  },
  admin: {
    users: {
      createDefaultAdmin: '/admin/create-default-admin',
      toggleAdminStatus: (userId: string) =>
        `/admin/users/${userId}/toggle-admin-status`,
    },
  },
};
