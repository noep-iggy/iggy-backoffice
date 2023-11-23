import { errorMessage } from '@/errors';

import {
  CreateTaskApi,
  TaskRecurrenceEnum,
  TaskStatusEnum,
  UpdateTaskApi,
} from '@/types';
import * as yup from 'yup';
import { recurrenceValidation } from './recurrence';

const create: yup.ObjectSchema<CreateTaskApi> = yup.object({
  title: yup
    .string()
    .required(errorMessage.fields('title').REQUIRED)
    .typeError(errorMessage.fields('title').NOT_STRING),
  description: yup
    .string()
    .min(1, errorMessage.fields('description').REQUIRED)
    .optional()
    .default(undefined)
    .typeError(errorMessage.fields('description').NOT_STRING),
  date: yup
    .date()
    .required(errorMessage.fields('date').REQUIRED)
    .typeError(errorMessage.fields('date').NOT_VALID),
  userIds: yup.array().required(errorMessage.fields('userIds').REQUIRED),
  animalIds: yup.array().required(errorMessage.fields('animalIds').REQUIRED),
  recurrence: yup
    .mixed<TaskRecurrenceEnum>()
    .oneOf(
      Object.values(TaskRecurrenceEnum),
      errorMessage.fields('type').NOT_VALID
    )
    .optional()
    .default(undefined),
});

const update: yup.ObjectSchema<UpdateTaskApi> = yup.object({
  title: yup
    .string()
    .min(1, errorMessage.fields('title').REQUIRED)
    .optional()
    .default(undefined)
    .typeError(errorMessage.fields('title').NOT_STRING),
  description: yup
    .string()
    .min(1, errorMessage.fields('description').REQUIRED)
    .optional()
    .default(undefined)
    .typeError(errorMessage.fields('description').NOT_STRING),
  status: yup
    .mixed<TaskStatusEnum>()
    .oneOf(
      Object.values(TaskStatusEnum),
      errorMessage.fields('status').NOT_VALID
    )
    .optional()
    .default(undefined)
    .typeError(errorMessage.fields('status').NOT_STRING),
  recurrence: recurrenceValidation.update,
  message: yup
    .string()
    .min(1, errorMessage.fields('message').REQUIRED)
    .optional()
    .default(undefined)
    .typeError(errorMessage.fields('message').NOT_STRING),
  date: yup
    .date()
    .min(1, errorMessage.fields('date').REQUIRED)
    .optional()
    .default(undefined)
    .typeError(errorMessage.fields('date').NOT_STRING),
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
  pictureId: yup
    .string()
    .min(1, errorMessage.fields('profilePicture').REQUIRED)
    .optional()
    .default(undefined),
});

export const taskValidation = {
  create,
  update,
};
