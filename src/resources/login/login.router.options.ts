import LoginService from "./login.service";
import loginSchema from './login.schema';
import { verifyCredentials } from '../helpers/utils';

const loginRouterOptions = {
  authenticateUser: {
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: LoginService.authenticate,
    plugins: {
      'hapi-swagger': {
        responses: {
          204: {
            description: 'You logged in successfully!'
          },
          400: {
            description: 'Bad request'
          },
          403: {
            description: 'Forbidden'
          }
        }
      }
    },
    description: 'Try to log in',
    tags: ['api', 'login'],
    validate: {
      payload: loginSchema
    }
  }
}

export default loginRouterOptions;
