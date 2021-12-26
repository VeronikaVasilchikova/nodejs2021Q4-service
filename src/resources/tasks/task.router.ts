import taskRouterOptions from './task.router.options';

const taskRouter = {
  getAllTasks: {
    method: 'GET',
    path: '/boards/{boardId}/tasks',
    options: taskRouterOptions.getAllTasks
  },
  getTaskById: {
    method: 'GET',
    path: '/boards/{boardId}/tasks/{taskId}',
    options: taskRouterOptions.getTask
  },
  updateTaskById: {
    method: 'PUT',
    path: '/boards/{boardId}/tasks/{taskId}',
    options: taskRouterOptions.updateTask
  },
  createTask: {
    method: 'POST',
    path: '/boards/{boardId}/tasks',
    options: taskRouterOptions.createTask
  },
  deleteTaskById: {
    method: 'DELETE',
    path: '/boards/{boardId}/tasks/{taskId}',
    options: taskRouterOptions.deleteTask
  }
}

export default taskRouter;
