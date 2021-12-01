const Boom = require('@hapi/boom');

const pageNotFound = {
  method: '*',
  path: '/{any*}',
  handler: (request, h) => {
    console.log(h);
    throw Boom.notFound('Page not found');
  }
}

module.exports = pageNotFound;
