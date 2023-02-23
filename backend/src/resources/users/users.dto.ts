import Joi from 'joi';

export const CreateUserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required()
});

export const UpdateUserPayloadSchema = Joi.object({
  _id: Joi.string().required(),
  username: Joi.string(),
  email: Joi.string().email(),
  fullname: Joi.string()
});
