import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const isProductionDatabase =
  process.env.NODE_ENV === "production" ||
  process.env.DB_HOST?.includes("render.com") ||
  Boolean(process.env.DATABASE_URL);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || undefined,
  port: Number(process.env.DB_PORT),
  ssl: isProductionDatabase
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

export default pool;
