import dotenv from 'dotenv'
dotenv.config()
import pool from '../config/database'
import { RequestHandler } from 'express'

export const addBudget: RequestHandler = (req, res) => {
    const budget = {
        username: req.params.username,
        category: req.params.category,
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
}

export const getBudgetsForUser: RequestHandler = (req, res) => {
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
}

export const updateValueForCategory: RequestHandler = (req, res) => {
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
}

export const deleteCategoryForUser: RequestHandler = (req, res) => {
    const username = req.params.username
    const category = req.params.category

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query(
            'delete from users_categories where username = ? and category = ?',
            [username, category],
            err => {
                connection.release()
                if (err) return res.status(500).json(err)
                res.status(201).json({
                    message: 'Category deleted'
                })
            })
    })
}