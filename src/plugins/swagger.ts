import * as HapiSwagger from 'hapi-swagger';
// import { Plugin } from "@hapi/hapi";
import SWAGGER_OPTIONS from '../../doc/swagger-options';

const SWAGGER = {
  plugin: HapiSwagger,
  options: SWAGGER_OPTIONS
};

export default SWAGGER;
