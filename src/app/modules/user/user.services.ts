import config from "../../config";
import AppError from "../../errors/Apperror";
import type { TLoginUser, TUser } from "./user-interface";
import { User } from "./user-model";
import httpStatus from "http-status";

import { createRefreshToken, createToken } from "./user.utils";

const RegisterUser = async (payload: TUser) => {
  if (!payload) {
    throw new AppError(404,'User is undefined or null');
  }

  const existingUser = await User.findOne({ email: payload.email });

  payload.role = 'user'

  if (existingUser) {
    throw new AppError(404,'Email already exist');
  }
  const user = await User.create(payload);
  const jwtPayload = {
    email: user?.email,
    role: "user",
  };



  const accessToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    String(config.jwt_access_expires_in)
  );

  const refreshToken = createRefreshToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.email);  

  const isBlocked = user?.isBlocked;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  const jwtPayload = {
    email: user?.email ?? "default_email",      
    role: user?.role ?? "user",                     
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createRefreshToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    token,
    refreshToken,
  };
};

export const UserServices = {
  RegisterUser,
  loginUser,
};
