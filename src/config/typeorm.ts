import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as envConfig } from 'dotenv';

envConfig({
  path: '.env',
});

const dbConfig = {
  type: 'postgres',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ['/dist/**/*.entity.{.ts,.js}'],
  autoLoadEntities: true,
  logging: false,
  synchronize: true,
  dropSchema: false,
};
export default registerAs('typeorm', () => dbConfig);

export const connection = new DataSource(dbConfig as DataSourceOptions);
