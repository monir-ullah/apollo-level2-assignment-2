import bcrypt from 'bcrypt';
import { Model, Schema, model } from 'mongoose';
import { TOrder, TUser } from './user.interface';
import config from '../config';

export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}

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
  orders: new Schema<TOrder[]>([
    {
      productName: {
        type: String,
        required: [true, 'productName is required.'],
      },
      price: { type: Number, required: [true, 'price is required.'] },
      quantity: { type: Number, required: [true, 'quantity is required.'] },
    },
  ]),
});

// pre middleware
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});
userSchema.static(
  'isUserExists',
  async function myStaticMethod(userId: number) {
    const isUserExists = await MUser.findOne({ userId });
    return isUserExists;
  },
);
// // createing a stactic method.
// userSchema.methods.isUserExists = async function name(id: number) {
//   return await MUser.findOne({ userId: id });
// };

// export interface UserMethods {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists(id: number): Promise<TUser | null>;
// }

// export type UserModel = Model<TUser, Record<string, never>, UserMethods>;

// Model Creation
// export const MUser = model<TUser, UserModel>('User', userSchema);
export const MUser = model<TUser, UserModel>('User', userSchema);
