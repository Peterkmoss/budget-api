import express from 'express'
const router = express.Router()
import pool from '../config/database'

router.get('/', (req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('select * from users_categories', (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            if (results.length === 0) return res.status(200).json({
                message: 'No values added'
            })
            res.status(200).json({
                budgets: results
            })
        })
    })
})

router.post('/', (req, res) => {
    const budget = {
        username: req.body.username,
        category: req.body.category,
        value: req.body.value
    }

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('insert into users_categories set ?', budget, (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            res.status(201).json({
                message: budget.username + ' added a value for category: ' + budget.category,
                budget: budget
            })
        })
    })
})

router.get('/:username', (req, res) => {
    const username = req.params.username

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('select * from users_categories where username = ?', username, (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            res.status(201).json({
                budget: results
            })
        })
    })
})

router.patch('/:username/:category', (req, res) => {
    const username = req.params.username
    const category = req.params.category

    const value = req.body.value

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query(
            'update users_categories set value = ? where username = ? and category = ?',
            [value, username, category],
            (err, results) => {
                connection.release()
                if (err) return res.status(500).json(err)
                res.status(201).json({
                    budget: results
                })
            })
    })
})

router.delete('/:budgetId', (req, res) => {
    res.status(200).json({
        message: 'Deleted budget'
    })
})

export default router