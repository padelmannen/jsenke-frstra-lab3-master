import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

sqlite3.verbose();

const databasePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "db.sqlite"
);

// Open and initialize the database
export default await (async () => {
  const db = await open({
    filename: databasePath,
    driver: sqlite3.Database,
  });

  await db.run("DROP TABLE IF EXISTS users");
  await db.run("CREATE TABLE users (username TEXT, password TEXT)");

  return db;
})();
