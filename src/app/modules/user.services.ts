import { TUser } from './user.interface';
import { MUser } from './user.schema';

const createUserInDB = async (userInfo: TUser) => {
  try {
    if (await MUser.isUserExists(userInfo.userId)) {
      throw new Error('User already exists!');
    }
    const createdUserResult = await MUser.create(userInfo);
    const hidePassword = { ...createdUserResult.toObject() };
    delete hidePassword.password;
    return hidePassword;
  } catch (error) {
    return {
      success: false,
      error,
    };
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
      throw new Error('User not found');
    }
  } catch (error) {
    if (error) {
      throw new Error('User not found');
    }
  }
};

const deleteOneFromDB = async (userId: number) => {
  try {
    if (await MUser.isUserExists(userId)) {
      return await MUser.findOneAndDelete(userId);
    } else {
      throw new Error('User not found!');
    }
  } catch (error) {
    if (error) {
      throw new Error('User not found');
    }
  }
};

export const UserServices = {
  createUserInDB,
  getAllUsersFromMongoDB,
  findSingleUser,
  updateUserInfoInDB,
  deleteOneFromDB,
};
