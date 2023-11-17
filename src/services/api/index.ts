import { AdminApiService } from './adminService';
import { AnimalApiService } from './animalService';
import { AuthApiService } from './authService';
import { HouseApiService } from './houseService';
import { TaskApiService } from './taskService';
import { UserApiService } from './userService';

export const ApiService = {
  auth: AuthApiService,
  users: UserApiService,
  admin: AdminApiService, 
  houses: HouseApiService,
  animals: AnimalApiService,
  tasks: TaskApiService,
};