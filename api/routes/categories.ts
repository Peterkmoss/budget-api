import express from 'express'
const router = express.Router()
import pool from '../config/database'

router.get('/', (req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('select category from categories', (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            res.status(201).json({
                categories: results
            })
        })
    })
})

router.post('/', (req, res) => {
    const category = {
        category: req.body.category
    }

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('insert into categories set ?', category, (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            res.status(201).json({
                message: 'Inserted category: ' + req.body.category
            })
        })
    })
})

router.get('/:category', (req, res) => {
    const category = req.params.category

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('select category from categories where category = ?', category, (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            res.status(201).json({
                category: results
            })
        })
    })
})

router.patch('/:category', (req, res) => {
    const category = req.params.category

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('update categories set category = ? where category = ?', [req.body.category, category], (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            if (!(results['affectedRows'] > 0)) return res.status(404).json({
                message: 'User not found'
            })
            res.status(201).json({
                message: 'Updated category name for category: ' + req.body.category + ' to: ' + category
            })
        })
    })
})

router.delete('/:category', (req, res) => {
    const category = req.params.category

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('delete from categories where category = ?', category, (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            if (!(results['affectedRows'] > 0)) return res.status(404).json({
                message: 'Category not found'
            })
            res.status(201).json({
                message: 'Deleted category: ' + category
            })
        })
    })
})

export default router