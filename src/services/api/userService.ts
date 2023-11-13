
import { HttpService } from '../httpService';
import { API_ROUTES } from '../apiRoutes';
import { UpdateUserApi, UserDto } from '@/types';


const me = async (): Promise<UserDto> => {
  return (await HttpService.get(API_ROUTES.users.me)).data;
};

const updateMe = async (payload: UpdateUserApi): Promise<UserDto> => {
  return (await HttpService.patch(API_ROUTES.users.updateMe, payload)).data;
};

const deleteMe = async (): Promise<void> => {
  await HttpService.delete(API_ROUTES.users.deleteMe);
};

const getAll = async (): Promise<UserDto[]> => {
  return (await HttpService.get(API_ROUTES.users.getAll)).data;
}

const getOne = async (userId: string): Promise<UserDto> => {
  return (await HttpService.get(API_ROUTES.users.getOne(userId))).data;
}

const updateOne = async (userId: string, payload: UpdateUserApi): Promise<UserDto> => {
  return (await HttpService.patch(API_ROUTES.users.updateOne(userId), payload)).data;
}

const deleteOne = async (userId: string): Promise<void> => {
  await HttpService.delete(API_ROUTES.users.deleteOne(userId));
}

export const UserApiService = {
  me,
  updateMe,
  deleteMe,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
