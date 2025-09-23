import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.resolve(__dirname, '../../src/db/test.db')

let db = null
try {
  db = new Database(dbPath, { verbose: console.log })
  console.log('DB Path:', dbPath)
  console.log('Connected to the SQLite3 database.')
} catch (err) {
  console.error('Connection error:', err.message)
}
process.on('exit', () => db.close())
export default db

// db.exec(`
//   CREATE TABLE IF NOT EXISTS users (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   email TEXT,
//   password TEXT,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
// )`)

// try {
//   db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run('mesto@outlook.com', '909090')
// } catch (err) {
//   console.error(err.message)
// }

try {
  const users = db.prepare('SELECT * FROM users').all()
  console.log('Users:', users)
} catch (err) {
  console.error(err.message)
}

// try {
//   const user = db.prepare('SELECT * FROM users WHERE email = ?').get('mesto@outlook.com')
//   console.log('User:', user)
// } catch (err) {
//   console.error(err.message)
// }

// try {
//   const user = db.prepare('UPDATE users SET email = ? WHERE id = ?').run('mesto@outlook.com', 1)
//   console.log('User:', user)
// } catch (err) {
//   console.error(err.message)
// }

// try {
//   const user = db.prepare('DELETE FROM users WHERE id = ?').run(1)
//   console.log('User:', user)
// } catch (err) {
//   console.error(err.message)
// }

try {
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all()
  console.log(
    'Tablolar:',
    tables.map((r) => r.name)
  )
} catch (err) {
  console.error(err.message)
}
