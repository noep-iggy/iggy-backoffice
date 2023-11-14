export const ROUTES = {
  home: '/',
  houses: {
    list: '/houses',
    detail: (houseId: string) => `/houses/${houseId}`,
  },
  users: {
    list: '/users',
    detail: (userId: string) => `/users/${userId}`,
  },
  animals: {
    list: '/animals',
    detail: (animalId: string) => `/animals/${animalId}`,
  },
  auth: {
    login: '/login',
  },
};
