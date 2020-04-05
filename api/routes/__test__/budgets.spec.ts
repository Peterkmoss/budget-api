import axios from 'axios'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import pool from '../../config/database'
import { rejects } from 'assert'

const username = 'testuser'
const password = 'testpassword'
const category = 'testcategory'
const token = jwt.sign({
    username: username
}, process.env.JWT_TOKEN!, { expiresIn: '5m' })

describe('Budgets tests', () => {
    beforeEach(() => {
        return populateDatabase()
    })

    afterEach(() => {
        return clearDatabase()
    })

    // Fuckng lort
    // it('Returns one budget for user with one budget', async () => {
    //     await populateDatabase()
    //     const result = await axios.get('http://localhost:3000/api/budgets/' + username, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //     console.log(result.data)
    //     expect(result.data['budget'].length).toBe(1)
    // })
})

async function populateDatabase() {
    return new Promise(resolve => {
        pool.getConnection((err, connection) => {
            const user = {
                username: username,
                password: password
            }
            const cat = {
                category: category
            }
            const budget = {
                username: user.username,
                category: cat.category,
                value: 10.0
            }
            connection.query(
                'insert into users set ?; insert into categories set ?; insert into users_categories set ?',
                [user, cat, budget],
                () => {
                    connection.release()
                    resolve()
                })
        })
    })
}

async function clearDatabase() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(
                'delete from users_categories where username = ? and category = ?; delete from categories where category = ?; delete from users where username = ?',
                [username, category, category, username],
                (err) => {
                    connection.release()
                    if (err) return reject()
                    resolve()
                })
        })
    })
}