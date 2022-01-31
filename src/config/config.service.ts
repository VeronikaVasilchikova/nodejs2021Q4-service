import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersEntity } from '../users/user.entity';
import { TasksEntity } from '../tasks/task.entity';
import { BoardsEntity } from '../boards/board.entity';
import { ColumnsEntity } from '../boards/columns.entity';

require('dotenv').config();

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
      host: this.getValue('POSTGRES_HOST') || 'localhost',
      port: +this.getValue('POSTGRES_PORT') || 5432,
      username: this.getValue('POSTGRES_USER') || 'postgres',
      password: this.getValue('POSTGRES_PASSWORD') || 'JSrac1503hak@',
      database: this.getValue('POSTGRES_DB') || 'nestjsdb',
      logging: false,
      entities: [UsersEntity, TasksEntity, ColumnsEntity, BoardsEntity],
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
