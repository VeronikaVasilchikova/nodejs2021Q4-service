const {
  POSTGRES_PORT=5432,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
} = process.env;
const pathToRootFolder: string = process.argv[2] === 'production' ? 'build' : 'src';

export default {
  type: 'postgres',
  // host: 'postgres-db',
  host: 'localHost',
  port: +POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: false,
  entities: [`${pathToRootFolder}/entity/**/*.ts`],
  migrations: [`${pathToRootFolder}/migration/**/*.ts`],
  subscribers: [`${pathToRootFolder}/subscriber/**/*.ts`],
  cli: {
    migrationsDir: `${pathToRootFolder}/migration`,
    entitiesDir: `${pathToRootFolder}/entity`,
    subscribersDir: `${pathToRootFolder}/subscriber`
  },
  synchronize: false
};
