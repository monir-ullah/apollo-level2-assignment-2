import { Request, Response } from 'express';
import { userJoiSchema } from './user.joi.validation';
import { UserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const userBody = req.body;
    // hello
    const joiValidation = await userJoiSchema.validateAsync(userBody, {
      abortEarly: false,
    });

    const result = await UserServices.createUserInDB(joiValidation);
    if (result.success == false) {
      return res.status(500).json({
        success: result.success,
        message: result.error,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'User created successfully!',
        userData: result,
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

export const UserControler = {
  createUser,
};
