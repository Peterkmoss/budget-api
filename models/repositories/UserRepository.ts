import IUserRepository from "./UserRepositoryInterface";
import User from '../User';
import pool from '../../config/database';
import bcrypt from 'bcrypt';

export default class UserRepository implements IUserRepository {
    create(user: User, callback: (error?: Error, result?: User) => void): void {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) return callback(err)
            const entity = new User(
                user.username,
                hash
            )

            pool.getConnection((err, connection) => {
                if (err)
                    return callback(err)
                connection.query('select count(*) from users where username = ?', entity.username, (err, res) => {
                    if (err) 
                        return callback(err)
                    if (res[0]['count(*)'] > 0)
                        return callback(new Error('User already exists'))
                    connection.query('insert into users set ?', entity, (err, res) => {
                        connection.release()
                        delete entity.password;
                        if (err) return callback(err)
                        else callback(undefined, entity)
                    })
                })
            })
        })
    }

    get(username: string, callback: (error?: Error, user?: User) => void): void {
        pool.getConnection((err, connection) => {
            if (err) return callback(err)
            connection.query('select * from users where username = ?', username, (err, res) => {
                if (err) return callback(err)
                if (res.length === 0) return callback(new Error('User not found'))
                return callback(undefined, res[0])
            })
        }) 
    }
}