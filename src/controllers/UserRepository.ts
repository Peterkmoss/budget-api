import IUserRepository from "./IUserRepository";
import crypto from 'crypto'
import User from '../models/User'
import UserDTO from "../models/UserDTO";
import pool from '../config/database'

export default class UserRepository implements IUserRepository {
    create(user: UserDTO, callback: (code: number) => void): void {
        const salt = crypto.randomBytes(16).toString('hex')
        const entity = new User(
            user.username,
            salt,
            crypto.createHmac('sha512', salt).update(user.password).digest('hex')
        )

        pool.getConnection((err, connection) => {
            connection.query('insert into users set ?', entity, (err, res) => {
                connection.release()
                if (err) callback(400)
                else callback(201)
            })
        })
    }

    get(username: string, callback: (user: UserDTO) => void): void {
        throw new Error("Method not implemented.");
    }
}