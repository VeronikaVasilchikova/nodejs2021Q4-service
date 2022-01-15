import 'reflect-metadata';
import { Connection, getConnectionOptions, createConnection } from 'typeorm';

/**
 * Initiate connection with postgres db
 * @returns Promise with connection
 */
export const initDb = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();
  const connection: Connection = await createConnection({
    ...connectionOptions,
    entities: ['entities/*.ts']
  });
  await connection.synchronize(true);
  return connection;
}
