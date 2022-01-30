import loginRouterOptions from './login.router.options';

const loginRouter = {
  authenticateUser: {
    method: 'POST',
    path: '/login',
    options: loginRouterOptions.authenticateUser
  }
}

export default loginRouter;
