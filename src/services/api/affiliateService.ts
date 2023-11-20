import {
  AffiliateDto,
  AnimalTypeEnum,
  CreateAffiliateApi,
  SearchParams,
  UpdateAffiliateApi,
} from '@/types';
import { API_ROUTES } from '../apiRoutes';
import { HttpService } from '../httpService';

const getAll = async (params: SearchParams): Promise<AffiliateDto[]> => {
  return (await HttpService.get(API_ROUTES.affiliate.getAll, { params })).data;
};

const getOne = async (animalId: string): Promise<AffiliateDto> => {
  return (await HttpService.get(API_ROUTES.affiliate.getOne(animalId))).data;
};

const updateOne = async (
  animalId: string,
  payload: UpdateAffiliateApi
): Promise<AffiliateDto> => {
  return (
    await HttpService.patch(API_ROUTES.affiliate.updateOne(animalId), payload)
  ).data;
};

const deleteOne = async (animalId: string): Promise<void> => {
  await HttpService.delete(API_ROUTES.affiliate.deleteOne(animalId));
};

const getAllByAnimalType = async (
  animalType: AnimalTypeEnum,
  params: SearchParams
): Promise<AffiliateDto[]> => {
  return (
    await HttpService.get(
      API_ROUTES.affiliate.getAllByAnimalType(animalType),
      params
    )
  ).data;
};

const createOne = async (
  payload: CreateAffiliateApi
): Promise<AffiliateDto> => {
  return (await HttpService.post(API_ROUTES.affiliate.createOne, payload)).data;
};

export const AffiliateApiService = {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  getAllByAnimalType,
  createOne,
};
