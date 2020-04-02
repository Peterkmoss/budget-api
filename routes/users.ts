import express from 'express'
import { validate, ValidationError, Joi } from 'express-validation'
import UserRepository from './repositories/UserRepository'
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
    repo.create(user, user => {
        res.status(204).json(user)
    })
})

router.post('/login', validate(loginValidation), passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

router.get('/', (req, res) => {
  res.json(new User('hello', 'world'));
})

module.exports = router;
