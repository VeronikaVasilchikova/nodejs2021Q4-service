import dotenv from 'dotenv';
import path from 'path';

const pathToEnv: string = process.argv[2] === 'production' ? '../../../.env' : '../../.env';

dotenv.config({
  path: path.join(__dirname, pathToEnv)
});

const CONFIG = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOGGING_VAR: process.env.LOGGING_VAR
};

export default CONFIG;
