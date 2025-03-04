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
        refreshToken
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
      refreshToken
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const UpdateInformations = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const ProjectData = req.body;
  const result = await UserServices.UpdateInformation(projectId, ProjectData);


  if (result !== null) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal updated successfully',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Id not found',
      data: result,
    });
  }
});

const getSingleEmail = catchAsync(async (req, res) => {

  const { email } = req.params;
  const result = await UserServices.getSingleEmail(email);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    });
  
  })


export const UserController = {
  createUser,
  loginUser,
  refreshToken,
  UpdateInformations,
  getSingleEmail
};
