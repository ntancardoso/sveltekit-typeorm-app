import { DataSourceOptions } from 'typeorm';
import { config } from "dotenv";

const isTest = process.env.NODE_ENV === 'test';
const isProd = process.env.NODE_ENV === 'production';
const isStage = process.env.NODE_ENV === 'stage';
const isDev = !isTest && !isProd && !isStage;

const envFile = isTest ? '.env.test' : isStage ? '.env.stage' : isProd ? '.env.prod' : '.env';
config({ path: envFile });

console.log({
    env: process.env.NODE_ENV,
    database: process.env.DB_DATABASE
});

const ormconfig: DataSourceOptions = {
    type: process.env.DB_TYPE as "postgres" | "mysql" | "sqlite",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",
    migrations: ['.svelte-kit/output/server/db/migrations/*.js'],
};

if (process.env.DB_TYPE === "sqlite") {
    delete ormconfig.host;
    delete ormconfig.port;
    delete ormconfig.username;
    delete ormconfig.password;
}

export default ormconfig;
