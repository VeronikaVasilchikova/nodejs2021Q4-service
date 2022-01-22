import HapiSwagger from 'hapi-swagger';
import * as Package from '../package.json';

const SWAGGER_OPTIONS: HapiSwagger.RegisterOptions = {
  jsonPath: '/documentation.json',
  documentationPath: '/doc',
  info: {
    title: 'Trello Service',
    description: `Let's try to create a competitor for Trello!`,
    version: Package.version
  },
  tags: [
    {
      name: 'users',
      description: 'Users operations'
    },
    {
      name: 'boards',
      description: 'Boards operations'
    },
    {
      name: 'tasks',
      description: 'Tasks operations'
    },
    {
      name: 'login',
      description: 'Try to login'
    }
  ],
  grouping: 'tags'
}

export default SWAGGER_OPTIONS;
