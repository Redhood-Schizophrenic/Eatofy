// utils/jwt.ts
import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || `dTTM{w'V.9zZ~=B?cB9=5fhI.a??'=u`;

export interface TokenPayload extends JwtPayload {
  hotel_id: string;
  employee_id: string;
}

export const createToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, secret, { expiresIn: '1d' }); // 1 day
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (e) {
    return null;
  }
};
