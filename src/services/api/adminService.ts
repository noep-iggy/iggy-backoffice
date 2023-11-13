
import { HttpService } from '../httpService';
import { API_ROUTES } from '../apiRoutes';

const createDefaultAdmin = async (): Promise<void> => {
  await HttpService.get(API_ROUTES.admin.createDefaultAdmin);
};

const toggleAdminStatus = async (userId: string): Promise<void> => {
  await HttpService.get(API_ROUTES.admin.toggleAdminStatus(userId));
};

export const AdminApiService = {
  users: {
    createDefaultAdmin,
    toggleAdminStatus,
  },
};
