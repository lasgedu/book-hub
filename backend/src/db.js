import Database from "better-sqlite3"
import fs from "fs"
import path from "path"
import "dotenv/config"
const dbPath = process.env.SQLITE_PATH || "./data/bookhub.sqlite"
const dir = path.dirname(dbPath)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
export const db = new Database(dbPath)
export function migrate() {
  db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, passwordHash TEXT NOT NULL, createdAt TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, author TEXT NOT NULL, genre TEXT NOT NULL, description TEXT NOT NULL, coverUrl TEXT, publishedDate TEXT NOT NULL, rating REAL NOT NULL DEFAULT 0, createdAt TEXT NOT NULL);`)
}
