import Joi from 'joi';

// Product order Schema validation
export const joiProductOrderSchmea = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

// User Schema validation
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
  orders: Joi.array().items(joiProductOrderSchmea),
});

// Update User Schema validation
export const updateUserJoiSchema = Joi.object({
  userId: Joi.number(),
  username: Joi.string(),
  password: Joi.string(),
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
  age: Joi.number(),
  email: Joi.string().email(),
  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string()),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  }),
  orders: Joi.array().items(joiProductOrderSchmea),
});
