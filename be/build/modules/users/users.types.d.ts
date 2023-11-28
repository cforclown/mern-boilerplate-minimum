import { Document } from 'mongoose';
export interface IUser extends Document {
    _id: string;
    id: string;
    username: string;
    email: string;
    password?: string;
    fullname: string;
}
export interface ICreateUserPayload {
    username: string;
    email: string;
    password?: string;
    fullname: string;
}
export interface IUpdateUserPayload {
    username?: string;
    email?: string;
    password?: string;
    fullname?: string;
}
export interface IChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
