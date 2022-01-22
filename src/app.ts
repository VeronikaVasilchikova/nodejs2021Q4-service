import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Jwt from '@hapi/jwt';
import { get } from 'node-emoji';
import 'reflect-metadata';
import { getConnection } from 'typeorm';
import bcryptjs from 'bcryptjs';
import CONFIG from './common/config';
import SWAGGER from './plugins/swagger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import pageNotFound from './resources/helpers/pageNotFound';
import Logger from './logger';
import { initDb } from './db';
import { Users } from './entity/users.entity';

const plugins = [Inert, Vision];
const { PORT, JWT_SECRET_KEY } = CONFIG;

/**
 * Initiate Hapi server
 * @returns Promise with Hapi server
 */
const createServer = async (): Promise<Hapi.Server> => {
  const server: Hapi.Server = Hapi.server({
    port: PORT || 4000,
    host: '0.0.0.0',
    routes: {
      validate: {
        failAction: async (request, h, error) => {
          const {description} = request.route.settings;
          if (request.route.path.includes('boards') && !request.route.path.includes('tasks')) {
            Logger.logValidationError(description, <Error>error, './logs/board-logger.json');
          }
          if (request.route.path.includes('tasks')) {
            Logger.logValidationError(description, <Error>error, './logs/task-logger.json');
          }
          if (request.route.path.includes('users')) {
            Logger.logValidationError(description, <Error>error, './logs/user-logger.json');
          }
          throw error;
        }
      }
    }
  });

  await server.register(plugins);
  await server.register(SWAGGER);
  await server.register(Jwt);

  // Describe jwt strategy
  server.auth.strategy('hapi_jwt_strategy', 'jwt', {
    keys: JWT_SECRET_KEY as string,
    verify: {
      aud: 'urn:audience:test',
      iss: 'urn:issuer:test',
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400,
      timeSkewSec: 15
    },
    validate: async (artifacts, request, h) => {
      console.log(artifacts)
      return {
        isValid: true,
        credentials: {
          users: artifacts.decoded.payload.users
        }
      };
    }
  });

  // Set the strategy
  server.auth.default('hapi_jwt_strategy');

  server.route(pageNotFound);

  // user routes
  server.route(userRouter.getAllUsers);
  server.route(userRouter.getUserById);
  server.route(userRouter.updateUserById);
  server.route(userRouter.createUser);
  server.route(userRouter.deleteUserById);

  // board routes
  server.route(boardRouter.getAllBoards);
  server.route(boardRouter.getBoardById);
  server.route(boardRouter.updateBoardById);
  server.route(boardRouter.createBoard);
  server.route(boardRouter.deleteBoardById);

  // task routes
  server.route(taskRouter.getAllTasks);
  server.route(taskRouter.getTaskById);
  server.route(taskRouter.updateTaskById);
  server.route(taskRouter.createTask);
  server.route(taskRouter.deleteTaskById);

  // login routes

  // clear all files contain logging
  Logger.clearFile('./logs/board-logger.json');
  Logger.clearFile('./logs/task-logger.json');
  Logger.clearFile('./logs/user-logger.json');
  Logger.clearFile('./logs/error-logger.json');

  try {
    await initDb();
    const password: string = await bcryptjs.hash('admin', 10);
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(Users, 'user')
      .where('user.login = :login', {login: 'admin'})
      .getOne();

    if (!user) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values([{login: 'admin', password} ])
        .execute();
    }
    process.stdout.write(`${get('dvd')} DB initialization -> Done! ${get('dvd')} \n`);
  } catch(error) {
    process.stderr.write(`${get('skull_and_crossbones')} ${(<Error>error).message} ${get('skull_and_crossbones')}`);
    process.exit(1);
  }

  try {
    await server.start();
    process.stdout.write(`${get('rocket')} Server is running on ${server.info.uri} ${get('rocket')} \n`);
  } catch(error) {
    process.stderr.write(`${get('skull_and_crossbones')} ${(<Error>error).message} ${get('skull_and_crossbones')}`);
    process.exit(1);
  }

  return server;
};

export default createServer;
