import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import CONFIG from './common/config';
import SWAGGER from './plugins/swagger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import pageNotFound from './resources/helpers/index';

const plugins = [Inert, Vision];
const { PORT } = CONFIG;

/**
 * Initiate Hapi server
 *
 * @returns {Promise<void>}
 */
const init = async (): Promise<void> => {
  const server = Hapi.server({
    port: PORT || 3000,
    host: 'localhost'
  });

  await server.register(plugins);
  await server.register(SWAGGER);

  server.route(pageNotFound);

  // user routes
  server.route(userRouter.getAllUsers);
  server.route(userRouter.getUserById);
  server.route(userRouter.updateUserById);
  server.route(userRouter.creatUser);
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

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err): void => {
  console.log(err);
  process.exit(1);
});

init();