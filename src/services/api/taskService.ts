import { SearchParams, TaskDto, UpdateTaskApi } from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const getAll = async (params: SearchParams): Promise<TaskDto[]> => {
  return (await HttpService.get(API_ROUTES.tasks.getAll, { params })).data;
};

const getOne = async (taskId: string): Promise<TaskDto> => {
  return (await HttpService.get(API_ROUTES.tasks.getOne(taskId))).data;
};

const updateOne = async (
  taskId: string,
  payload: UpdateTaskApi
): Promise<TaskDto> => {
  return (await HttpService.patch(API_ROUTES.tasks.updateOne(taskId), payload))
    .data;
};

const deleteOne = async (taskId: string): Promise<void> => {
  await HttpService.delete(API_ROUTES.tasks.deleteOne(taskId));
};

const removeRecurrence = async (taskId: string): Promise<void> => {
  await HttpService.delete(API_ROUTES.tasks.removeRecurrence(taskId));
};

const getTasksByHouseId = async (
  houseId: string,
  params: SearchParams
): Promise<TaskDto[]> => {
  return (
    await HttpService.get(API_ROUTES.tasks.getTasksByHouseId(houseId), {
      params,
    })
  ).data;
};

export const TaskApiService = {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  removeRecurrence,
  getTasksByHouseId,
};
