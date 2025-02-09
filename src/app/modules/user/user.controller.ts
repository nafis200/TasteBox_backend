import httpStatus from "http-status";
import { UserServices } from "./user.services";
import sendResponse from "../../utils/sendresponse";
import catchAsync from "../../utils/catchAsync";

const RegisterUser = catchAsync(async (req, res) => {
    const result = await UserServices.RegisterUser(req.body);
    const { accessToken } = result;
  
   
  
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
    const {  accessToken } = result;
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User is logged in succesfully!",
      data: {
        accessToken,
      },
    });
  });


  export const UserControllers = {
    loginUser,
    RegisterUser
  };