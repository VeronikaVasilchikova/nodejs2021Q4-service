import dotenv from 'dotenv';
import path from 'path';

const pathToEnv: string = process.argv[2] === 'production' ? '../../../.env' : '../../.env';

dotenv.config({
  path: path.join(__dirname, pathToEnv)
});

const CONFIG = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOGGING_VAR: process.env.LOGGING_VAR,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB
};

export default CONFIG;
