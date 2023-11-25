import { Request, Response } from 'express';
import { joiProductOrderSchmea, userJoiSchema } from './user.joi.validation';
import { UserServices } from './user.services';
import { proudctOrderSchema } from './user.schema';

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

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const deletedUser = await UserServices.deleteOneFromDB(Number(userId));
    console.log(deletedUser);
    res.status(200).json({
      success: true,
      message: 'User delted successfully!',
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
    const errorList = error.details.map((errorItem) => errorItem.message);
    res.status(404).json({
      success: false,
      message: 'Validation error',
      error: errorList,
    });
  }
};

const specificUserOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userOrderList = await UserServices.findUserOrderListInDB(
      Number(userId),
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

export const UserControler = {
  createUser,
  getAllUsers,
  findUserById,
  updateUserInfo,
  deleteUser,
  newProductOder,
  specificUserOrders,
};
