import loginRouterOptions from './login.router.options';

const taskRouter = {
  createTask: {
    method: 'POST',
    path: '/login',
    options: loginRouterOptions.authenticateUser
  }
}

export default taskRouter;
