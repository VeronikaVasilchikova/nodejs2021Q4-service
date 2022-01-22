import Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Boom from '@hapi/boom';
import Logger from '../../logger';
import { createToken } from '../helpers/utils';

export default class LoginService {
  /**
   * Returns Hapi response with jwt token and status code 201 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static authenticate = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      Logger.logRequestInfo('login', request, '../../logs/user-logger.json', 201);
      return h.response({ id_token: createToken(request.pre.user) }).code(201);
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
