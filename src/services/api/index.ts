import { AdminApiService } from './adminService';
import { AuthApiService } from './authService';
import { HouseApiService } from './houseService';
import { UserApiService } from './userService';

export const ApiService = {
  auth: AuthApiService,
  users: UserApiService,
  admin: AdminApiService, 
  houses: HouseApiService,
};