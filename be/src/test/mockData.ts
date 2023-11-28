import { ICreateUserPayload, IRegisterUserPayload, IUpdateUserPayload, IUserRaw } from '../modules';

export const mockUser: IUserRaw = {
  _id: 'user-id',
  id: 'user-id',
  email: 'email@email.com',
  username: 'username',
  fullname: 'fullname'
};

export const mockCreateUserPayload: ICreateUserPayload = {
  username: 'create-username',
  email: 'create-email@email.com',
  password: 'password',
  fullname: 'fullname'
};

export const mockUpdateUserPayload: IUpdateUserPayload = {
  username: 'update-username',
  email: 'update-email@email.com',
  fullname: 'update-fullname'
};

export const mockRegisterUserPayload: IRegisterUserPayload = {
  username: 'username',
  email: 'email@email.com',
  fullname: 'fullname',
  password: 'password',
  confirmPassword: 'password'
};
