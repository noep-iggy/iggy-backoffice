import { AdminApiService } from './adminService';
import { AffiliateApiService } from './affiliateService';
import { AnimalApiService } from './animalService';
import { AuthApiService } from './authService';
import { BillingPlanApiService } from './billingPlanService';
import { HouseApiService } from './houseService';
import { MediaApiService } from './mediaService';
import { TaskApiService } from './taskService';
import { UserApiService } from './userService';

export const ApiService = {
  auth: AuthApiService,
  users: UserApiService,
  admin: AdminApiService,
  houses: HouseApiService,
  animals: AnimalApiService,
  tasks: TaskApiService,
  affiliates: AffiliateApiService,
  billingPlans: BillingPlanApiService,
  medias: MediaApiService,
};
