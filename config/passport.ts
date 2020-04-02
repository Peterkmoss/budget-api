import { Strategy, VerifyFunction, IVerifyOptions } from 'passport-local';
import { PassportStatic } from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/User';
import UserRepository from '../routes/repositories/UserRepository';

export const init = (passport: PassportStatic) => {
    const authenticateUser: VerifyFunction = (username, password, done) => {
        getUser(username, user => {
            if (!user) return done(null, false)

            bcrypt.compare(password, user.password, (err, same) => {
                if (err) return done(err, false)
                if (same) return done(null, user)
            })

        });
    };

    passport.use(new Strategy({}, authenticateUser));
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((username, done) => { })
}

const getUser = (username: string, callback: (user: User) => any): void => {
    const repo = new UserRepository();
    repo.get(username, user => callback(user));
}