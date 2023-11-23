import { TUser } from './user.interface';
import { MUser } from './user.schema';

const createUserInDB = async (userInfo: TUser) => {
  try {
    if (await MUser.findOne({ userId: userInfo.userId })) {
      throw new Error('User already exitst');
    } else {
      const createdUserResult = await MUser.create(userInfo);
      const hidePassword = { ...createdUserResult.toObject() };
      delete hidePassword.password;
      return hidePassword;
    }
  } catch (error) {
    const errorMessage = { success: false, error: 'User already exitst' };
    return errorMessage;
  }
};

export const UserServices = {
  createUserInDB,
};
