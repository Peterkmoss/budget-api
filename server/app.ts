import express from 'express'
const app = express()
import usersRouter from '../api/routes/users'
import budgetRouter from '../api/routes/budgets'

app.use('/users', usersRouter)
app.use('/budgets', budgetRouter)

export default app