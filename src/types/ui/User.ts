import { UpdateAddressApi } from '@web-template/types';

export interface UpdateUserUi {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: UpdateAddressApi;
}
