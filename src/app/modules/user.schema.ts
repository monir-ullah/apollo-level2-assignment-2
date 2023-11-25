import bcrypt from 'bcrypt';
import { Model, Schema, model } from 'mongoose';
import { TOrder, TUser } from './user.interface';
import config from '../config';

// interface for isUserExists cheaking
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser | null>;
}

// Product Order Schema for validation
export const proudctOrderSchema = new Schema<TOrder[]>([
  {
    productName: {
      type: String,
      required: [true, 'productName is required.'],
    },
    price: { type: Number, required: [true, 'price is required.'] },
    quantity: { type: Number, required: [true, 'quantity is required.'] },
  },
]);

// User Schema for validation
export const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User ID is required.'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'User Name is required.'],
  },
  password: { type: String, required: [true, 'Password is required.'] },
  fullName: {
    firstName: { type: String, required: [true, 'First Name is required.'] },
    lastName: { type: String, required: [true, 'Last Name is required.'] },
  },
  age: { type: Number, required: [true, 'Age is required.'] },
  email: { type: String, unique: true, required: [true, 'Email is required.'] },
  isActive: { type: Boolean, required: [true, 'isActive is required.'] },
  hobbies: { type: [String] },
  address: {
    street: { type: String, required: [true, 'city is required.'] },
    city: { type: String, required: [true, 'city is required.'] },
    country: { type: String, required: [true, 'city is required.'] },
  },
  orders: proudctOrderSchema,
});

// pre middleware
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// static method for define is a user exist or not
userSchema.static(
  'isUserExists',
  async function myStaticMethod(userId: number) {
    const isUserExists = await MUser.findOne({ userId });
    return isUserExists;
  },
);

export const MUser = model<TUser, UserModel>('User', userSchema);
