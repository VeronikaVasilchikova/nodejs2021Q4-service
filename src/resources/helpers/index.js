const Boom = require('@hapi/boom');

const pageNotFound = {
  method: '*',
  path: '/{any*}',
  handler: () => {
    throw Boom.notFound('Page not found');
  }
}

module.exports = pageNotFound;
