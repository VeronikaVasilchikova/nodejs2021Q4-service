import CONFIG from './config';

const { POSTGRES_PORT=5432, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = CONFIG;

export default {
  type: 'postgres',
  host: '0.0.0.0',
  port: +POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB
};
