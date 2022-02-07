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

  await db.run("DROP TABLE IF EXISTS lorem");
  await db.run("CREATE TABLE lorem (info TEXT)");

  const statement = await db.prepare("INSERT INTO lorem VALUES (?)");
  for (let i = 0; i < 10; i += 1) {
    statement.run(`ipsum ${i}`);
  }
  statement.finalize();

  return db;
})();
