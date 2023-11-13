export const ROUTES = {
  home: '/',
  houses: {
    list: '/houses',
    detail: (houseId: string) => `/houses/${houseId}`,
  },
  user: {
    detail: '/user/detail',
  },
  auth: {
    login: '/login',
  },
};
