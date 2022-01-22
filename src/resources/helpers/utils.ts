import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Request } from "@hapi/hapi";
import { getRepository } from 'typeorm';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users } from '../../entity/users.entity';
import Logger from '../../logger';
import { IUserData, ILoginPayload } from './interfaces';
import CONFIG from '../../common/config';

const verifyCredentials = async (request: Request, h: Hapi.ResponseToolkit) => {
  const { payload } = request;
  const {name, login, password} = payload as ILoginPayload;
  const repo = getRepository(Users);
  let userItem: IUserData | undefined;
  if (name) {
    userItem = await repo.findOne({ where: { name } });
  }
  if (login) {
    userItem = await repo.findOne({ where: { login } });
  }

  if (userItem) {
    bcryptjs.compare(password, userItem.password, (err, isValid) => {
      if (isValid) {
        Logger.logRequestInfo('login', request, '../../logs/user-logger.json', 201);
        return h.response(Users.toResponse(<IUserData>userItem)).code(200);
      }
      else {
        Logger.logError('clientError', 'login', `Forbidden! Incorrect password!`, 403);
        return h.response(Boom.badRequest('Incorrect password!')).code(403);
      }
    });
  }
  else {
    Logger.logError('clientError', 'login', `UIncorrect name or login!`, 404);
    throw Boom.notFound(`User not found`);
  }
}

const createToken = (user: {id: string, login: string}): string => {
  const { JWT_SECRET_KEY } = CONFIG;

  return jwt.sign({
    id: user.id,
    login: user.login
  }, JWT_SECRET_KEY as string, { algorithm: 'HS256', expiresIn: "1h" } );
}

export {
  verifyCredentials,
  createToken
};
