import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as envConfig } from 'dotenv';

envConfig({
  path: '.env',
});

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // logging: true,
  entities: ['dist/**/*.entity.{.ts,.js}'],
  autoLoadEntities: true,
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
  // dropSchema: true,
};
export default registerAs('typeorm', () => config);

export const connection = new DataSource(config as DataSourceOptions);
