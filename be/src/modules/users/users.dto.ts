import Joi from 'joi';

export const UpdateUserPayloadSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  fullname: Joi.string()
});

export const ChangePasswordPayloadSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.string().required()
});
