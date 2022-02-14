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

  await db.run("DROP TABLE IF EXISTS users"); // ändra
  await db.run("CREATE TABLE users (username TEXT, password TEXT)"); // ändra

  const statement = await db.prepare(
    "INSERT INTO users (username, password) VALUES ('jesper','123')"
  );
  // for (let i = 0; i < 10; i += 1) {
  //   // statement.run(`user ${i}, password ${i}`);
  //   statement.run(`"user"${i}, "password"${i}`)
  // }
  statement.run();
  const statement2 = await db.prepare(
    "INSERT INTO users (username, password) VALUES ('johan','321')"
  );
  statement2.run();
  statement.finalize();

  return db;
})();
