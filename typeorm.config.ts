import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './src/libs/database/seeds/main.seed';
config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '123456',
  database: process.env.MYSQL_DATABASE_NAME || 'pet-shop',
  entities: ['src/libs/database/entity/*{.ts,.js}'],
  migrations: ['src/libs/database/migrations/*.ts'],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
