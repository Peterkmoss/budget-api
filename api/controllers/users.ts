import dotenv from 'dotenv'
dotenv.config()
import pool from '../config/database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { registerValidation } from '../models/validations'

export const deleteUser: RequestHandler = (req, res) => {
    const username = req.params.username

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('delete from users where username = ?', username, (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            if (!(results['affectedRows'] > 0)) return res.status(404).json({
                message: 'User not found'
            })
            res.status(201).json({
                message: 'Deleted user: ' + username
            })
        })
    })
}

export const registerUser: RequestHandler = (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const user = {
        username: req.body.username,
        password: hashedPassword
    }

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('select count(*) from users where username = ?', user.username, (err, results) => {
            if (results[0]['count(*)'] > 0) {
                connection.release()
                return res.status(409).json({
                    message: 'User exists'
                })
            }
            connection.query('insert into users set ?', user, (err, results) => {
                connection.release()
                if (err) return res.status(500).json(err)
                delete user.password
                res.status(201).json({
                    message: 'Created new user',
                    user: user.username
                })
            })
        })
    })
}

export const loginUser: RequestHandler = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('select * from users where username = ?', username, (err, results) => {
            if (!results || results.length === 0) {
                connection.release()
                return res.status(401).json({
                    error: 'Invalid credentials'
                })
            }
            const passwordsMatch = bcrypt.compareSync(password, results[0]['password'])
            if (!passwordsMatch)
                return res.status(401).json({
                    error: 'Invalid credentials'
                })
            dotenv.config()
            if (!process.env.JWT_TOKEN) return res.status(500).json({
                error: 'Server secret not set. Could not issue token!'
            })
            const token = jwt.sign({
                username: username
            }, process.env.JWT_TOKEN, { expiresIn: '1h' })
            res.status(200).json({
                message: 'Authenticated!',
                token: token
            })
        })
    })
}

//TODO This should maybe return the user info instead of just the username...
export const getUserInfo: RequestHandler = (req, res) => {
    const username = req.params.username

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('select username from users where username = ?', username, (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            if (!results[0]) return res.status(404).json({
                message: 'User not found'
            })
            res.status(201).json({
                message: 'Got user: ' + username
            })
        })
    })
}

export const updatePassword: RequestHandler = (req, res) => {
    const username = req.params.username

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json(err)
        connection.query('update users set password = ? where username = ?', [req.body.password, username], (err, results) => {
            connection.release()
            if (err) return res.status(500).json(err)
            if (!(results['affectedRows'] > 0)) return res.status(404).json({
                message: 'User not found'
            })
            res.status(201).json({
                message: 'Updated password for user: ' + username
            })
        })
    })
}