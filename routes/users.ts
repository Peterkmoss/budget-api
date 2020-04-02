import express from 'express'
import { validate, ValidationError, Joi } from 'express-validation'
import UserRepository from '../models/repositories/UserRepository'
import User from '../models/User'
import passport from 'passport'

const loginValidation = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
}

const router = express.Router()

router.post('/signup', validate(loginValidation), (req, res) => {
    const repo = new UserRepository()
    const user = new User(req.body.username, req.body.password)
    repo.create(user, (err, user) => {
        if (err) {
            res.status(400).json({ message: err.message })
            return
        }
        res.redirect('/login')
    })
})

router.post('/login', validate(loginValidation), passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

module.exports = router;
