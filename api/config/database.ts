import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

let pool: mysql.Pool

pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
})

export default pool