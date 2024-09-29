import * as dotenv from 'dotenv';

dotenv.config()

export const jwtConstant = {
  secret: process.env.JWT_TOKEN_SECRET,
  expired: process.env.JWT_TOKEN_EXPIRE
}