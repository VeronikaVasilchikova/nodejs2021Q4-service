const Package = require('../../package.json') ;

const swaggerOptions = {
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

module.exports = swaggerOptions;
