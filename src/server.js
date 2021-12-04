const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const { PORT } = require('./common/config');
const Swagger = require('./plugins/swagger');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const pageNotFound = require('./resources/helpers/index');

const plugins = [Inert, Vision, Swagger];

const init = async () => {
  const server = Hapi.server({
    port: PORT || 3000,
    host: 'localhost'
  });

  await server.register(plugins);

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

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
