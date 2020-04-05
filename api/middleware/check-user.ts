import { RequestHandler } from 'express'

const handler: RequestHandler = (req, res, next) => {
    const token: any = req.userToken
    console.log(token['username'])
    if (token['username'] !== req.params.username)
        return res.status(401).json({
            message: 'You do not have permissions to do that'
        })
    next()
}

export default handler