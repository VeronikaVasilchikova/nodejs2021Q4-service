const HapiSwagger = require('hapi-swagger');
const swaggerOptions = require('../../doc/swagger-options');

module.exports = {
  plugin: HapiSwagger,
  options: swaggerOptions
};
