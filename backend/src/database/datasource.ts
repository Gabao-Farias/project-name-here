import "dotenv/config";
import { DataSource } from "typeorm";

const isProduction = process.env.NODE_ENV === "prd";

const host = process.env.POSTGRES_HOST;
const port = Number(process.env.POSTGRES_PORT);
const username = process.env.POSTGRES_USER_NAME;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DATABASE_NAME;

const entities = [`${__dirname}/../**/*.entity{.ts,.js}`];
const migrations = [`${__dirname}/../database/migrations/*{.ts,.js}`];

export const datasource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  synchronize: !isProduction,
  logging: !isProduction ? "all" : undefined,
  entities,
  migrations,
});

export const initializeDatasources = async (): Promise<void> => {
  await Promise.all([datasource.initialize()]);
};
