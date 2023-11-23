import Joi from 'joi';

export const userJoiSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
  age: Joi.number(),
  email: Joi.string().email(),
  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string()),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
  }),
  orders: Joi.array().items(
    Joi.object({
      productName: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  ),
});
