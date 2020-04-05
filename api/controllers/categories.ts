import pool from '../config/database'
import { RequestHandler } from 'express'

export const getAllCategories: RequestHandler = (req, res) => {
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
}

export const getCategory: RequestHandler = (req, res) => {
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
}

export const addCategory: RequestHandler = (req, res) => {
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
}

export const updateCategory: RequestHandler = (req, res) => {
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
}

export const deleteCategory: RequestHandler = (req, res) => {
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
}