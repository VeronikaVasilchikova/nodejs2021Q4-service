const {
  POSTGRES_HOST,
  POSTGRES_PORT = 5432,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

export default {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: +POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migration/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: 'src/**/*.entity.ts',
  },
  synchronize: false,
};
