/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import {
  joiProductOrderSchmea,
  updateUserJoiSchema,
  userJoiSchema,
} from './user.joi.validation';
import { UserServices } from './user.services';
import { UserNotFoundError } from './user.customerror';

// Handle Request and Response for user creation with validation
const createUser = async (req: Request, res: Response) => {
  try {
    const userBody = req.body;
    const joiValidation = await userJoiSchema.validateAsync(userBody, {
      abortEarly: false,
    });

    const result = await UserServices.createUserInDB(joiValidation);
    if (result instanceof Error) {
      return res.status(500).json({
        success: false,
        message: 'Can not create new user',
        error: result,
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

// Written for view all user information
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsersResult = await UserServices.getAllUsersFromMongoDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched sucesfully!',
      data: allUsersResult,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

// Write for user find
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

// Handle user update info Request, Response
const updateUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const joiValidation = await updateUserJoiSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const updatedUserInfo = await UserServices.updateUserInfoInDB(
      Number(userId),
      joiValidation,
    );
    if (updatedUserInfo) {
      if (updatedUserInfo instanceof UserNotFoundError) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        });
      } else {
        const findUpdatedUserInfo = await UserServices.findSingleUser(
          Number(userId),
        );
        return res.status(200).json({
          success: true,
          message: 'User updated successfully!',
          data: findUpdatedUserInfo,
        });
      }
    }
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorList = error.details.map((errorItem: any) => errorItem.message);
    res.status(500).json({
      success: false,
      message: 'Validation error',
      error: errorList,
    });
  }
};
// Delete a user if exist
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await UserServices.deleteOneFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Handle New product order with validation  Request and Response
const newProductOder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const joiProdutOrderValidation = await joiProductOrderSchmea.validateAsync(
      req.body,
      {
        abortEarly: false,
      },
    );

    const orderCreated = await UserServices.productNewOrderIntoDB(
      Number(userId),
      joiProdutOrderValidation,
    );

    if (orderCreated instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }
  } catch (error: any) {
    const errorList = error.details.map((errorItem: any) => errorItem.message);
    res.status(500).json({
      success: false,
      message: 'Validation error',
      error: errorList,
    });
  }
};

// Handle Specific User OrderList  req and response
const specificUserorderList = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userOrderList =
      await UserServices.findOrderListORCalculateTotalfromDB(
        Number(userId),
        false,
      );
    if (userOrderList instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: userOrderList,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetchs Orders',
      data: error,
    });
  }
};

// Handle total Price req and response
const specificUserTotalPrice = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const totalPrice = await UserServices.findOrderListORCalculateTotalfromDB(
      Number(userId),
      true,
    );
    if (totalPrice instanceof Error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: totalPrice,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetchs Orders',
      data: error,
    });
  }
};
export const UserControler = {
  createUser,
  getAllUsers,
  findUserById,
  updateUserInfo,
  deleteUser,
  newProductOder,
  specificUserorderList,
  specificUserTotalPrice,
};
