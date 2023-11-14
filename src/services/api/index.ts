import { AdminApiService } from './adminService';
import { AnimalApiService } from './animalService';
import { AuthApiService } from './authService';
import { HouseApiService } from './houseService';
import { UserApiService } from './userService';

export const ApiService = {
  auth: AuthApiService,
  users: UserApiService,
  admin: AdminApiService, 
  houses: HouseApiService,
  animals: AnimalApiService,
};