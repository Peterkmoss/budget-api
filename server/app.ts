import express, {NextFunction} from 'express'
const app = express()
import morgan from 'morgan'
import categoriesRouter from '../api/routes/categories'

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH')
        return res.status(200).send()
    }
    next()
})

// Routes
app.use('/api/categories', categoriesRouter)

app.use((next: NextFunction) => {
    const err = new Error('Not found')
    next(err)
})

const errorHandler = (err: Error, res?: any) => {
    let status
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
