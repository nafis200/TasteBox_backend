import config from '../../config';
import AppError from '../../errors/Apperror';
import type { TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';
import httpStatus from 'http-status';

const loginUser = async (payload: TUser) => {
  const user = await User.isUserExistsByCustomId(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
  );

  return {
    accessToken,
  };
};

const RegisterUser = async (payload: TUser) => {
  if (!payload) {
    throw new AppError(404, 'User is undefined or null');
  }

  const existingUser = await User.findOne({ email: payload.email });

  payload.role = 'user';

  if (existingUser) {
    throw new AppError(404, 'Email already exist');
  }
  const user = await User.create(payload);
  const jwtPayload = {
    email: user?.email,
    role: 'user',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
  );

  return {
    accessToken,
  };
};

export const UserServices = {
  loginUser,
  RegisterUser
};
