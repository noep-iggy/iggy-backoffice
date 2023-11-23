import { errorMessage } from '@/errors';
import { BillingPlanTypeEnum, CreateHouseApi, UpdateHouseApi } from '@/types';
import * as yup from 'yup';

const create: yup.ObjectSchema<CreateHouseApi> = yup.object({
  name: yup
    .string()
    .required(errorMessage.fields('name').REQUIRED)
    .typeError(errorMessage.fields('name').NOT_STRING),
});

const update: yup.ObjectSchema<UpdateHouseApi> = yup.object({
  name: yup
    .string()
    .min(1, errorMessage.fields('name').REQUIRED)
    .optional()
    .default(undefined),
  userIds: yup
    .array()
    .min(1, errorMessage.fields('userIds').REQUIRED)
    .optional()
    .default(undefined),
  animalIds: yup
    .array()
    .min(1, errorMessage.fields('animalIds').REQUIRED)
    .optional()
    .default(undefined),
  billingPlan: yup
    .string<BillingPlanTypeEnum>()
    .oneOf(
      Object.values(BillingPlanTypeEnum),
      errorMessage.fields('billingPlan').NOT_VALID
    )
    .optional()
    .default(undefined),
});

export const houseValidation = {
  create,
  update,
};
