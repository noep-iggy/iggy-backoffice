
import { HttpService } from '../httpService';
import { API_ROUTES } from '../apiRoutes';
import { AnimalDto, SearchParams, UpdateAnimalApi } from '@/types';


const getAll = async (
  params: SearchParams,
): Promise<AnimalDto[]> => {
  return (await HttpService.get(API_ROUTES.animals.getAll, { params })).data;
}

const getOne = async (animalId: string): Promise<AnimalDto> => {
  return (await HttpService.get(API_ROUTES.animals.getOne(animalId))).data;
}

const updateOne = async (animalId: string, payload: UpdateAnimalApi): Promise<AnimalDto> => {
  return (await HttpService.patch(API_ROUTES.animals.updateOne(animalId), payload)).data;
}

const deleteOne = async (animalId: string): Promise<void> => {
  await HttpService.delete(API_ROUTES.animals.deleteOne(animalId));
}

export const AnimalApiService = {
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
