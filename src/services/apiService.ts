
import { HttpService } from './httpService';
import { API_ROUTES } from './apiRoutes';
import { AuthLoginApi, UpdateUserApi, UserDto } from '@/types';


const login = async (payload: AuthLoginApi): Promise<string> => {
  return (await HttpService.post(API_ROUTES.auth.login, payload)).data
    .access_token;
};


const me = async (): Promise<UserDto> => {
  return (await HttpService.get(API_ROUTES.users.me)).data;
};

const updateMe = async (payload: UpdateUserApi): Promise<UserDto> => {
  return (await HttpService.patch(API_ROUTES.users.update, payload)).data;
};

const deleteMe = async (): Promise<void> => {
  await HttpService.delete(API_ROUTES.users.delete);
};

const createDefaultAdmin = async (): Promise<void> => {
  await HttpService.get(API_ROUTES.admin.users.createDefaultAdmin);
};

const toggleAdminStatus = async (userId: string): Promise<void> => {
  await HttpService.get(API_ROUTES.admin.users.toggleAdminStatus(userId));
};


export const ApiService = {
  auth: {
    login,
  },
  users: {
    me,
    updateMe,
    deleteMe,
  },
  admin: {
    users: {
      createDefaultAdmin,
      toggleAdminStatus,
    },
  },
};
