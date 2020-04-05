import express from 'express'
const app = express()
import morgan from 'morgan'
import usersRouter from '../api/routes/users'
import budgetRouter from '../api/routes/budgets'
import categoriesRouter from '../api/routes/categories'

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH')
        return res.status(200).json()
    }
    next()
})

// Routes
app.use('/api/users', usersRouter)
app.use('/api/budgets', budgetRouter)
app.use('/api/categories', categoriesRouter)

app.use((req, res, next) => {
    const err = new Error('Not found')
    next(err)
})

const errorHandler = (err: Error, req?: any, res?: any, next?: any) => {
    let status;
    if (err) status = 404
    res.status(status || 500)
    res.json({
        error: {
            message: err.message
        }
    })
}

app.use(errorHandler)


export default app