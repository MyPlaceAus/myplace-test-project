import 'dotenv/config';
import { DataSource } from 'typeorm';
import { buildDatabaseOptions } from './database.config';

const dataSource = new DataSource(buildDatabaseOptions());

export default dataSource;
