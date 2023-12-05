import { DataSource } from "typeorm";

const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const username = process.env.DATABASE_USER_NAME;
const password = process.env.DATABASE_PASSWORD;

const entities = [`${__dirname}/../**/*.entity{.ts,.js}`];
const migrations = [`${__dirname}/../database/migrations/*{.ts,.js}`];

export const datasource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database: "machines",
  synchronize: false,
  logging: "all",
  entities,
  migrations,
});

export const initializeDatasources = async (): Promise<void> => {
  await Promise.all([datasource.initialize()]);
};
