
import { HttpService } from '../httpService';
import { API_ROUTES } from '../apiRoutes';
import { HouseDto, SearchParams, UpdateHouseApi } from '@/types';


const getAll = async (
  params: SearchParams,
): Promise<HouseDto[]> => {
  return (await HttpService.get(API_ROUTES.houses.getAll, { params })).data;
}

const getOne = async (houseId: string): Promise<HouseDto> => {
  return (await HttpService.get(API_ROUTES.houses.getOne(houseId))).data;
}

const updateOne = async (houseId: string, payload: UpdateHouseApi): Promise<HouseDto> => {
  return (await HttpService.patch(API_ROUTES.houses.updateOne(houseId), payload)).data;
}

const deleteOne = async (houseId: string): Promise<void> => {
  await HttpService.delete(API_ROUTES.houses.deleteOne(houseId));
}

export const HouseApiService = {
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
