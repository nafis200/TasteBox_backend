import { model, Schema } from 'mongoose';
import type { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
const UserSchema = new Schema<TUser,UserModel>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default:'user'
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function(next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this 
    user.password = await bcrypt.hash(user.password,10);
    next()
})

UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });
  
  UserSchema.statics.isUserExistsByCustomId = async function (email: string) {
    return await User.findOne({ email }).select('+password');
  };
  
  UserSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };
  

export const User = model<TUser,UserModel>('User', UserSchema);
