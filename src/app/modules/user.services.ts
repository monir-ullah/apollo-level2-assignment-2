import { TUser } from './user.interface';
import { MUser } from './user.schema';

const createUserInDB = async (userInfo: TUser) => {
  //   try {
  //     if (await MUser.findOne({ userId: userInfo.userId })) {
  //       throw new Error();
  //     } else {
  //       const createdUserResult = await MUser.create(userInfo);
  //       const hidePassword = { ...createdUserResult.toObject() };
  //       delete hidePassword.password;
  //       return hidePassword;
  //     }
  //   } catch (error) {
  //     const errorMessage = { success: false, error: 'User already exitst' };
  //     return errorMessage;
  //   }

  try {
    if (await MUser.isUserExists(userInfo.userId)) {
      //   throw new Error('');
    }
    const createdUserResult = await MUser.create(userInfo);
    const hidePassword = { ...createdUserResult.toObject() };
    delete hidePassword.password;
    return hidePassword;
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong!. Can not create new user',
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
      throw new Error({ code: 404, description: 'User not found!' });
    }
  } catch (error) {
    // return {
    //   success: false,
    //   message: 'Something went wrong!. Can not create new user',
    //   error,
    // };
  }
};
export const UserServices = {
  createUserInDB,
  getAllUsersFromMongoDB,
  findSingleUser,
};
