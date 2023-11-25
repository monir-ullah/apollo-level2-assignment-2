import { ObjectId } from 'mongoose';
import { mongoDbClientConnection } from '../../server';
import { UserNotFoundError } from './user.customerror';
import { TUser } from './user.interface';
import { MUser } from './user.schema';

const createUserInDB = async (userInfo: TUser) => {
  try {
    if (await MUser.isUserExists(userInfo.userId)) {
      throw new Error('User already exists!');
    }
    const createdUserResult = await MUser.create(userInfo);
    const hidePassword = { ...createdUserResult.toObject() };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { password, ...objectWithOutPassword } = hidePassword;
    return objectWithOutPassword;
  } catch (error) {
    return error;
  }
};

const getAllUsersFromMongoDB = async () => {
  const allUser = await MUser.find(
    {},
    {
      username: true,
      fullName: true,
      age: true,
      email: true,
      address: true,
      _id: false,
    },
  );
  return allUser;
};
const findSingleUser = async (userId: number) => {
  try {
    if (await MUser.isUserExists(userId)) {
      return await MUser.findOne(
        { userId },
        { _id: false, password: false, __v: false },
      );
    } else {
      throw new Error('Something Wrong');
    }
  } catch (error) {
    if (error) {
      throw new Error('Something Wrong');
    }
  }
};

const updateUserInfoInDB = async (userId: number, updateInfo: TUser) => {
  try {
    if (await MUser.isUserExists(userId)) {
      return await MUser.findOneAndUpdate({ userId }, updateInfo, {
        returnOriginal: false,
      });
    } else {
      throw new UserNotFoundError('');
    }
  } catch (error) {
    return error;
  }
};

const deleteOneFromDB = async (userId: number) => {
  try {
    if (await MUser.isUserExists(userId)) {
      return await MUser.findOneAndDelete({ userId: userId });
    } else {
      throw new Error('User not found!');
    }
  } catch (error) {
    if (error) {
      throw new Error('User not found');
    }
  }
};

const productNewOrderIntoDB = async (userId: number, productBody: unknown) => {
  try {
    if (await MUser.isUserExists(userId)) {
      return await MUser.findOneAndUpdate(
        { userId },
        { $push: { orders: productBody } },
        {
          returnOriginal: false,
        },
      );
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    return error;
  }
};

const findOrderListORCalculateTotalfromDB = async (
  userId: number,
  isCalculateTotal: boolean,
) => {
  try {
    if (await MUser.isUserExists(userId)) {
      const userOrderList = await mongoDbClientConnection(userId);
      const { orders } = userOrderList as {
        orders?: {
          productName: string;
          price: number;
          quantity: number;
          _id: ObjectId;
        }[];
      };

      if (orders) {
        if (isCalculateTotal === false) {
          return {
            // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
            orders: orders.map(({ _id, ...withOutData }) => withOutData),
          };
        } else if (isCalculateTotal === true) {
          const singleItemTotalPrice: number[] = orders.map(
            (item) => item.price * item.quantity,
          );
          let totalPrice = 0;
          singleItemTotalPrice.forEach((price: number) => {
            totalPrice += price;
          });

          return { totalPrice };
        }
      } else {
        return 'Order not found';
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    return error;
  }
};

export const UserServices = {
  createUserInDB,
  getAllUsersFromMongoDB,
  findSingleUser,
  updateUserInfoInDB,
  deleteOneFromDB,
  productNewOrderIntoDB,
  findOrderListORCalculateTotalfromDB,
};
