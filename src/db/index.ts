import 'reflect-metadata';
import { Connection, getConnectionOptions, createConnection } from 'typeorm';

/**
 * Initiate connection with postgres db
 * @returns Promise with connection
 */
export const initDb = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();
  const connection = await createConnection(connectionOptions);
  await connection.synchronize(true);
  return connection;
}
