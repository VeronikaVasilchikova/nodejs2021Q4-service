import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import CONFIG from './common/config';
import SWAGGER from './plugins/swagger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import pageNotFound from './resources/helpers/pageNotFound';
import Logger from './logger';

const plugins = [Inert, Vision];
const { PORT } = CONFIG;

/**
 * Initiate Hapi server
 * @returns Promise with Hapi server
 */
const createServer = async (): Promise<Hapi.Server> => {
  const server: Hapi.Server = Hapi.server({
    port: PORT || 4000,
    host: 'localhost',
    routes: {
      validate: {
          failAction: async (request, h, error) => {
            const {description} = request.route.settings;
            if (request.route.path.includes('boards') && !request.route.path.includes('tasks')) {
              Logger.logValidationError(description, <Error>error, '../data/board-logger.json');
            }
            if (request.route.path.includes('tasks')) {
              Logger.logValidationError(description, <Error>error, '../data/task-logger.json');
            }
            if (request.route.path.includes('users')) {
              Logger.logValidationError(description, <Error>error, '../data/user-logger.json');
            }
            throw error;
          }
      }
  }
  });

  await server.register(plugins);
  await server.register(SWAGGER);

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

  // clear all files contain logging
  Logger.clearFile('src/data/board-logger.json');
  Logger.clearFile('src/data/task-logger.json');
  Logger.clearFile('src/data/user-logger.json');
  Logger.clearFile('src/data/error-logger.json');

  try {
    await server.start();
    process.stdout.write(`Server running on %s ${server.info.uri}\n`);
  } catch(error) {
    process.stderr.write((<Error>error).message);
    process.exit(1);
  }

  return server;
};

export default createServer;
