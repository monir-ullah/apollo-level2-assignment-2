import { Request, Response } from 'express';
import { userJoiSchema } from './user.joi.validation';
import { UserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const userBody = req.body;
    const joiValidation = await userJoiSchema.validateAsync(userBody, {
      abortEarly: false,
    });

    const result = await UserServices.createUserInDB(joiValidation);
    if (result.success == false) {
      let errorMesg;
      if (result.error.message.search(/userid/gi || /username/gi) != -1) {
        errorMesg = 'User alread exist!';
      } else {
        errorMesg = result.error.message;
      }
      return res.status(500).json({
        success: false,
        message: 'Something went wrong!. Can not create new user',
        error: errorMesg,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: result,
      });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went Wrong!',
        error,
      });
    }
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsersResult = await UserServices.getAllUsersFromMongoDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched sucesfully!',
      data: allUsersResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

const findUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const userFound = await UserServices.findSingleUser(Number(userId));
    if (userFound) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: userFound,
      });
    } else {
      throw new Error('User not found!');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const updatedUserInfo = await UserServices.updateUserInfoInDB(
      Number(userId),
      req.body,
    );
    if (updatedUserInfo) {
      const findUpdatedUserInfo = await UserServices.findSingleUser(
        Number(userId),
      );
      return res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: findUpdatedUserInfo,
      });
    } else {
      throw new Error('User not found!');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  }
};

export const UserControler = {
  createUser,
  getAllUsers,
  findUserById,
  updateUserInfo,
};
