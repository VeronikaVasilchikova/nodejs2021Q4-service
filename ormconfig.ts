import CONFIG from './src/common/config';

const { POSTGRES_PORT=5432, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = CONFIG;
const pathToRootFolder: string = process.argv[2] === 'production' ? 'build' : 'src';

export default {
  type: 'postgres',
  host: '0.0.0.0',
  port: +POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: false,
  entities: [`${__dirname}/${pathToRootFolder}/db/entities/**/*.ts`],
  migrations: [`${__dirname}/${pathToRootFolder}/db/migrations/**/*.ts`],
  cli: {
    migrationsDir: `${pathToRootFolder}/db/migrations`,
    entitiesDir: `${pathToRootFolder}/db/entities`
  },
  synchronize: false
};
