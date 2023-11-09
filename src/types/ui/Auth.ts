import { AuthRegisterApi } from '@web-template/types';

export interface AuthRegisterUi extends AuthRegisterApi {
  confirmPassword?: string;
}
