import express from 'express'
import helmet from 'helmet'
const app = express()

import customersRouter from './routers/customersRouters.js'
app.use(express.json())
app.use(helmet())

app.use('/api', customersRouter)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: err })
})

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'))
