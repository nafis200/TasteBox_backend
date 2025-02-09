import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn:'1000h'
  });
};
