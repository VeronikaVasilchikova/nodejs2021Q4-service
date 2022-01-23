import jwt from 'jsonwebtoken';
import { Request } from "@hapi/hapi";
import CONFIG from '../../common/config';

const createToken = (user: {id: string, login: string}): string => {
  const { JWT_SECRET_KEY } = CONFIG;

  return jwt.sign({
    id: user.id,
    login: user.login
  }, JWT_SECRET_KEY as string, { algorithm: 'HS256', expiresIn: '24h' } );
}

const verifyToken = async (request: Request): Promise<boolean | string> => {
  const { JWT_SECRET_KEY} = CONFIG;
  if (!request.headers || !request.headers.authorization) return false;
  const token = request.headers.authorization.split(' ')[1];
  if (!token) return false;
  const decode: string | jwt.JwtPayload = jwt.verify(token, JWT_SECRET_KEY as string);
  if (!decode) return false;
  return token;
}

export {
  createToken,
  verifyToken
};
