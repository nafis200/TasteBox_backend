import config from '../../config';
import AppError from '../../errors/Apperror';
import type { TLoginUser, TUser } from './user-interface';
import { User } from './user-model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { createRefreshToken, createToken } from './user.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';

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
    name:user?.name,
    role: 'user',
    phone_number:user?.phone_number,
    address:user?.address
 };

 

  const accessToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    String(config.jwt_access_expires_in),
  );

  const refreshToken = createRefreshToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginUser = async (payload: TLoginUser) => {
  if (!payload?.email && !payload?.phone_number) {
    throw new AppError(httpStatus.NOT_FOUND, 'Either email or phone number must be provided!');
  }

  let user;


  if (payload?.email) {
    user = await User.isUserExistsByCustomId(payload?.email);
  }
 
  if (!user && payload?.email) {
    user = await User.isUserExistsByCustomPhone(payload?.email);
  }
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }
  const jwtPayload = {
    email: user?.email ?? 'default_email',
    role: user?.role ?? 'user',
    name:user?.name,
    phone_number:user?.phone_number,
    address:user?.address
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


const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(email);

  const jwtPayload = {
    email: user?.email,
    name:user?.name,
    role: 'user',
    phone_number:user?.phone_number,
    address:user?.address
  };

  // console.log(jwtPayload)

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByCustomId(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.brcypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const UpdateInformation = async (
  projectId: string,
  ProjectData: Partial<TUser>,
) => {
  const { ...remainingData } = ProjectData;

  const result = await User.findByIdAndUpdate(
    projectId,
    {
      $set: {
        ...remainingData,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const getSingleEmail = async(email:string)=>{
  let user;


  if (email) {
    user = await User.isUserExistsByCustomId(email);
  }
  if(user){
    return user
  }
  return {
    data:"no email is find"
  }
}

export const UserServices = {
  RegisterUser,
  loginUser,
  refreshToken,
  changePassword,
  UpdateInformation,
  getSingleEmail
};
