import express from 'express'
const router = express.Router()
import pool from '../config/database'

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get users'
    })
})

router.post('/', (req, res, next) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('insert into users set ?', user, () => {
            delete user.password
            res.status(201).json({
                message: 'Created new user',
                user: user
            })
        })
    })
})

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: 'You passed userId: ' + id
    })
})

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: 'Updated user: ' + id
    })
})

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: 'Deleted user: ' + id
    })
})

export default router