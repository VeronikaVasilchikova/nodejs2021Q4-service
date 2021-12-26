import * as Boom from '@hapi/boom';

const pageNotFound = {
  method: '*',
  path: '/{any*}',
  handler: () => {
    throw Boom.notFound('Page not found');
  }
}

export default pageNotFound;
