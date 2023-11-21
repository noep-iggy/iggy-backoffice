import {
  BillingPlanTypeEnum,
  CreateBillingPlanApi,
  UpdateBillingPlanApi,
} from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';
import { BillingPlanDto } from './../../types/dto/BillingPlan';

const getAll = async (): Promise<BillingPlanDto[]> => {
  return (await HttpService.get(API_ROUTES.billingPlan.getAll)).data;
};

const getOneByType = async (
  type: BillingPlanTypeEnum
): Promise<BillingPlanDto> => {
  return (await HttpService.get(API_ROUTES.billingPlan.getOneByType(type)))
    .data;
};

const updateOneByType = async (
  type: BillingPlanTypeEnum,
  payload: UpdateBillingPlanApi
): Promise<BillingPlanDto> => {
  return (
    await HttpService.patch(
      API_ROUTES.billingPlan.updateOneByType(type),
      payload
    )
  ).data;
};

const deleteOneByType = async (type: BillingPlanTypeEnum): Promise<void> => {
  await HttpService.delete(API_ROUTES.billingPlan.deleteOneByType(type));
};

const createOne = async (
  payload: CreateBillingPlanApi
): Promise<BillingPlanDto> => {
  return (await HttpService.post(API_ROUTES.billingPlan.createOne, payload))
    .data;
};

export const BillingPlanApiService = {
  getAll,
  getOneByType,
  updateOneByType,
  deleteOneByType,
  createOne,
};
