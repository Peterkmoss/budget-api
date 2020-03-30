import express from 'express'
import { validate, ValidationError, Joi } from 'express-validation'
import UserRepository from './UserRepository'
import UserDTO from '../models/UserDTO'

const loginValidation = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
}

const router = express.Router()

router.post('/signup', validate(loginValidation), (req, res) => {
    const repo = new UserRepository()
    const user = new UserDTO(req.body.username, req.body.password)
    repo.create(user) // Ignoring status code for now
    res.redirect('back')
})

export default router