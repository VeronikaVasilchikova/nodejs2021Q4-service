import userRouterOptions from './user.router.options';

const userRouter = {
  getAllUsers: {
    method: 'GET',
    path: '/users',
    options: userRouterOptions.getAllUsers
  },
  getUserById: {
    method: 'GET',
    path: '/users/{userId}',
    options: userRouterOptions.getUser
  },
  updateUserById: {
    method: 'PUT',
    path: '/users/{userId}',
    options: userRouterOptions.updateUser
  },
  createUser: {
    method: 'POST',
    path: '/users',
    options: userRouterOptions.createUser
  },
  deleteUserById: {
    method: 'DELETE',
    path: '/users/{userId}',
    options: userRouterOptions.deleteUser
  }
}

export default userRouter;
