import { RequestHandler } from 'express'

const checkUser: RequestHandler = (req, res, next) => {
    const token: any = req.userToken
    if (token['username'] !== req.params.username)
        return res.status(401).json({
            message: 'You do not have permissions to do that'
        })
    next()
}

export default checkUser