import UserRepositoryInterface from "./UserRepositoryInterface";
import User from '../../models/User';
import pool from '../../config/database';
import bcrypt from 'bcrypt';

export default class UserRepository implements UserRepositoryInterface {
    create(user: User, callback: (user: User) => void): void {
        bcrypt.hash(user.password, 10, (err, pass) => {
            const entity = new User(
                user.username,
                pass
            )

            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('insert into users set ?', entity, (err, res) => {
                    connection.release()
                    delete entity.password;
                    if (err) throw err
                    else callback(entity)
                })
            })
        })
    }

    get(username: string, callback: (user: User) => void): void {
        throw new Error("Method not implemented.");
    }
}