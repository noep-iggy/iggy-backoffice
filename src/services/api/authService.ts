
import { HttpService } from '../httpService';
import { API_ROUTES } from '../apiRoutes';
import { AuthLoginApi } from '@/types';


const login = async (payload: AuthLoginApi): Promise<string> => {
  return (await HttpService.post(API_ROUTES.auth.login, payload)).data
    .access_token;
};

export const AuthApiService = {
  login,
};
