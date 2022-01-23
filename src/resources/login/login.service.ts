import Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Boom from '@hapi/boom';
import bcryptjs from 'bcryptjs';
import { getRepository } from 'typeorm';
import { createToken } from '../helpers/utils';
import { Users } from '../../entity/users.entity';
import Logger from '../../logger';
import { IUserData, ILoginPayload } from '../helpers/interfaces';

export default class LoginService {
  /**
   * Returns Hapi response with nothing or throw error
   * @param userItem object with user data from db
   * @param password password to compare
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved nothing or throw error
   */
  private static verifyCredentials = async (
    userItem: ILoginPayload,
    password: string,
    request: Request,
    h: Hapi.ResponseToolkit
  ): Promise<void> | never => {
    bcryptjs.compare(password, userItem.password, (err, isValid) => {
      if (isValid) {
        Logger.logRequestInfo('login', request, '../../logs/user-logger.json', 201);
        return h.response(Users.toResponse(<IUserData>userItem)).code(200);
      }
      else {
        Logger.logError('clientError', 'login', `Forbidden! Incorrect password!`, 403);
        const error = Boom.badRequest('Forbidden! Incorrect password!');
        error.output.statusCode = 403;
        error.reformat();
        throw error;
      }
    });
  }
  /**
   * Returns Hapi response with jwt token and status code 201 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static authenticate = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const { payload } = request;
      const { login, password } = payload as ILoginPayload;
      const repo = getRepository(Users);
      const userItem: IUserData | undefined = await repo.findOne({ where: { login } });
      if (!userItem) {
        Logger.logError('clientError', 'login', `Forbidden! User with login=${login} not found`, 403);
        const error = Boom.badRequest(`Forbidden! User with login=${login} not found`);
        error.output.statusCode = 403;
        error.reformat();
        throw error;
      }
      await this.verifyCredentials(userItem, password, request, h);
      Logger.logRequestInfo('login', request, '../../logs/user-logger.json', 201);
      const createdToken = createToken({id: userItem.id, login: userItem.login});
      return h.response({ token: createdToken }).code(201);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'login', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }
}
