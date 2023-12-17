import { Schema } from 'mongoose';
import { hashPassword } from '../../utils';

export interface IUser extends Document {
  _id: string;
  id: string;
  username: string;
  email: string;
  password?: string;
  fullname: string;
}

export interface IUserRes extends Omit<IUser, 'password'> {}

export interface ICreateUserPayload {
  username: string;
  email: string;
  password?: string;
  fullname: string;
};

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

export const usersSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: false, default: null },
  avatar: {
    type: {
      data: { type: String, required: true },
      filename: { type: String, required: true }
    },
    required: false,
    default: null
  },
  archived: { type: Boolean, required: false, default: false }
});

// virtualize _id to id when doing query
usersSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
usersSchema.set('toJSON', {
  virtuals: true
});

// Ensure virtual fields are serialised.
usersSchema.set('toObject', {
  virtuals: true
});

usersSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const hash = await hashPassword(this.password);
      this.password = hash;
    }
    next();
  } catch (err) {
    next(err as any);
  }
});
