import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaDir = path.resolve(__dirname, "../src/db/schema");

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

async function runMigrations() {
  const client = await pool.connect();

  try {
    const files = (await fs.readdir(schemaDir))
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const filePath = path.join(schemaDir, file);
      const sql = await fs.readFile(filePath, "utf8");

      console.log(`Running migration: ${file}`);
      await client.query(sql);
    }

    console.log("Migrations completed successfully.");
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
