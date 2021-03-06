import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'

const checkAuth: RequestHandler = (req, res, next) => {
    if (!process.env.JWT_SECRET) return res.status(500).json({
        message: 'Server secret not set. Could not issue token!'
    })
    try {
        const token = req.headers.authorization!.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userToken = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        })
    }
}

export default checkAuth