import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

/**
 * Initiate connection with postgres db
 * @returns Promise with connection
 */
export const initDb = async (): Promise<Connection> => {
  const connection: Connection = await createConnection();
  await connection.runMigrations();
  return connection;
}
