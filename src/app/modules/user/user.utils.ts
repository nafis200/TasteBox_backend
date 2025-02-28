
import jwt from 'jsonwebtoken';


export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  expiresIn: string,
) => {
  return jwt.sign({
    jwtPayload,
  }, secret, { expiresIn: '30s' });
  
};
export const createRefreshToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  expiresIn: string,
) => {
  return jwt.sign({
    jwtPayload,
  }, secret, { expiresIn: '1000d' });
  
};

