import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { Project } from '../modules/project/project.entity';
import { User } from '../modules/user/user.entity';

export const buildDatabaseOptions = (): DataSourceOptions => ({
  type: 'better-sqlite3',
  database: process.env.DB_NAME ?? 'sqlite.db',
  entities: [User, Project],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  synchronize: false,
  logging: false,
});
