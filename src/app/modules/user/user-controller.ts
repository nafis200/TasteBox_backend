import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import { UserServices } from "./user.services";
import httpStatus from "http-status";
const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.RegisterUser(req.body);
    const { refreshToken,  accessToken } = result;
  
    res.cookie("refreshToken", refreshToken, {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
    });
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User is Register in succesfully!",
      data: {
        accessToken,
      },
    });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  const { refreshToken, token } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: {
      token,
    },
  });
});

export const UserController = {
  createUser,
  loginUser,
};
