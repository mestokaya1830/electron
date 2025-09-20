import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
sqlite3.verbose()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.resolve(__dirname, '../../src/db/test.db')

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Connection error:', err.message)
  } else {
    console.log('DB Path:', dbPath)
    console.log('Connected to the SQLite3 database.')
  }
})

db.run(`
  CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  password TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

// db.run(`DROP TABLE IF EXISTS customers;`);
db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;", [], (err, rows) => {
  if (err) {
    console.error(err.message)
    return
  }
  console.log(
    'Tablolar:',
    rows.map((r) => r.name)
  )
})
export default db
