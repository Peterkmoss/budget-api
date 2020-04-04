import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export default (req: any, res: any, next: any) => {
    if (!process.env.JWT_TOKEN) return res.status(500).json({
        error: 'Server secret not set. Could not issue token!'
    })
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_TOKEN)
        req.userToken = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        })
    }
}