
import { HttpService } from '../httpService';
import { API_ROUTES } from '../apiRoutes';
import { HouseDto, SearchParams, UpdateHouseApi } from '@/types';


const getAll = async (
  params: SearchParams,
): Promise<HouseDto[]> => {
  return (await HttpService.get(API_ROUTES.houses.getAll, { params })).data;
}

const getOne = async (userId: string): Promise<HouseDto> => {
  return (await HttpService.get(API_ROUTES.houses.getOne(userId))).data;
}

const updateOne = async (userId: string, payload: UpdateHouseApi): Promise<HouseDto> => {
  return (await HttpService.patch(API_ROUTES.houses.updateOne(userId), payload)).data;
}

const deleteOne = async (userId: string): Promise<void> => {
  await HttpService.delete(API_ROUTES.houses.deleteOne(userId));
}

export const HouseApiService = {
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
