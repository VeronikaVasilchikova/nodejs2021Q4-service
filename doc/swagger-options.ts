import * as HapiSwagger from 'hapi-swagger';
const Package = require('../package.json') ;

const SWAGGER_OPTIONS: HapiSwagger.RegisterOptions = {
  jsonPath: '/documentation.json',
  documentationPath: '/documentation',
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
    }
  ],
  grouping: 'tags'
}

export default SWAGGER_OPTIONS;
