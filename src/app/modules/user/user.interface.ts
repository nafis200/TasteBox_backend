import { Model } from 'mongoose';
import type { USER_ROLE } from './user.constant';

export interface TUser {
  email: string;
  password: string;
  name?: string;
  role: 'admin' | 'user';
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;

  isPasswordMatched(
    plainTextpassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;