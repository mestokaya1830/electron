import express from 'express'
import tryCatch from '../middleware/tryCatch.js'
import db from '../db/sqliteConn.js'
const Router = express.Router()

// add customer
Router.post(
  '/customers',
  tryCatch(async (req, res) => {
    const { name, email } = req.body
    db.run('INSERT INTO customers (name, email) VALUES (?, ?)', [name, email], function (err) {
      if (err) {
        console.error(err.message)
        return
      }
      res.status(201).json({ id: this.lastID, name, email })
    })
  })
)

// get customers
Router.get(
  '/customers',
  tryCatch(async (req, res) => {
    db.all('SELECT * FROM customers', [], (err, rows) => {
      if (err) {
        console.error(err.message)
        return
      }
      res.json(rows)
    })
  })
)

// get edit customer
Router.get(
  '/customers/:id',
  tryCatch(async (req, res) => {
    const { id } = req.params
    db.get('SELECT * FROM customers WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error(err.message)
        return
      }
      res.json(row)
    })
  })
)

// UPDATE /customers/:id
Router.put(
  '/customers/:id',
  tryCatch(async (req, res) => {
    const { id } = req.params
    const { name, email } = req.body
    db.run(
      'UPDATE customers SET name = ?, email = ? WHERE id = ?',
      [name, email, id],
      function (err) {
        if (err) {
          console.error(err.message)
          return
        }
        res.status(204).end()
      }
    )
  })
)

// DELETE /customers/:id
Router.delete(
  '/customers/:id',
  tryCatch(async (req, res) => {
    const { id } = req.params
    db.run('DELETE FROM customers WHERE id = ?', [id], function (err) {
      if (err) {
        console.error(err.message)
        return
      }
      res.status(204).end()
    })
  })
)

export default Router
