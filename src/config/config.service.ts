import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersEntity } from '../users/user.entity';

const pathToEnv: string = process.argv[2] === 'production' ? '../../../.env' : '../../.env';
require('dotenv').config({
  path: require('path').join(__dirname, pathToEnv)
});

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Config error - missing env.${key}`)
    }
    return value;
  }

  private getPathToRoot(): string {
    return process.argv[2] === 'production' ? 'dist' : 'src';
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST') || 'postgres-db',
      port: +this.getValue('POSTGRES_PORT') || 5432,
      username: this.getValue('POSTGRES_USER') || 'postgres',
      password: this.getValue('POSTGRES_PASSWORD') || 'postgres',
      database: this.getValue('POSTGRES_DB') || 'nestjsdb',
      logging: false,
      entities: [UsersEntity],
      migrations: [`${this.getPathToRoot()}/migration/*.ts`],
      cli: {
        migrationsDir: `${this.getPathToRoot()}/migration`,
      },
      synchronize: true
    }
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB'
  ]);

export { configService };
