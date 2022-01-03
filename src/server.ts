import createServer from './app';
import Logger from './logger';

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error, origin: string): void => {
  Logger.logProcessError(origin, error.message);
  process.exit(1);
});

// uncomment code below to test 'uncaughtException'
// throw Error('Oops!');

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: {message: string}): void => {
  Logger.logProcessError('unhandledRejection', reason.message);
  process.exit(1);
});

// uncomment code below to test 'unhandledRejection'
// Promise.reject(Error('Oops!'));

createServer();
