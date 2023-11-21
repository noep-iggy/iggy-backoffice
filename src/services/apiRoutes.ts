import { AnimalTypeEnum, BillingPlanTypeEnum } from '@/types';

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
  },
  users: {
    me: '/users/me',
    updateMe: '/users/me',
    deleteMe: '/users/me',
    getAll: '/admin/users',
    getOne: (userId: string) => `admin/users/${userId}`,
    updateOne: (userId: string) => `admin/users/${userId}`,
    deleteOne: (userId: string) => `admin/users/${userId}`,
    toggleAdminStatus: (userId: string) =>
      `/admin/users/${userId}/toggle-admin-status`,
  },
  houses: {
    getAll: '/admin/houses',
    getOne: (houseId: string) => `/admin/houses/${houseId}`,
    updateOne: (houseId: string) => `/admin/houses/${houseId}`,
    deleteOne: (houseId: string) => `/admin/houses/${houseId}`,
  },
  animals: {
    getAll: '/admin/animals',
    getOne: (animalId: string) => `/admin/animals/${animalId}`,
    updateOne: (animalId: string) => `/admin/animals/${animalId}`,
    deleteOne: (animalId: string) => `/admin/animals/${animalId}`,
  },
  tasks: {
    getAll: '/admin/tasks',
    getOne: (taskId: string) => `/admin/tasks/${taskId}`,
    updateOne: (taskId: string) => `/admin/tasks/${taskId}`,
    deleteOne: (taskId: string) => `/admin/tasks/${taskId}`,
    removeRecurrence: (taskId: string) =>
      `/admin/tasks/${taskId}/remove-recurrence`,
    getTasksByHouseId: (houseId: string) => `/admin/houses/${houseId}/tasks`,
  },
  admin: {
    createDefaultAdmin: '/admin/create-default-admin',
    toggleAdminStatus: (userId: string) =>
      `/admin/users/${userId}/toggle-admin-status`,
  },
  affiliate: {
    getAll: '/admin/affiliates',
    getAllByAnimalType: (animalType: AnimalTypeEnum) =>
      `/affiliates/type/${animalType}`,
    getOne: (affiliateId: string) => `/affiliates/${affiliateId}`,
    createOne: '/admin/affiliates',
    updateOne: (affiliateId: string) => `/admin/affiliates/${affiliateId}`,
    deleteOne: (affiliateId: string) => `/admin/affiliates/${affiliateId}`,
  },
  billingPlan: {
    getAll: '/billing-plans',
    getOneByType: (type: BillingPlanTypeEnum) => `/billing-plans/${type}`,
    createOne: '/admin/billing-plans',
    updateOneByType: (type: BillingPlanTypeEnum) =>
      `/admin/billing-plans/${type}`,
    deleteOneByType: (type: BillingPlanTypeEnum) =>
      `/admin/billing-plans/${type}`,
  },
  media: {
    upload: '/file-upload',
  },
};
