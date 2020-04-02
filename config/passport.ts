import { Strategy, VerifyFunction } from 'passport-local';
import { PassportStatic } from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/User';
import UserRepository from '../models/repositories/UserRepository';

export const init = (passport: PassportStatic) => {
    const authenticateUser: VerifyFunction = (username, password, done) => {
        console.log('Authenticating')
        getUser(username, (err, user) => {
            if (err) return done(null, false)
            console.log(user)
            bcrypt.compare(password, user!.password, (err, same) => {
                if (err) return done(err, false)
                if (same) return done(null, user)
                return done(null, false)
            })
        });
    };

    passport.use(new Strategy({}, authenticateUser));
    passport.serializeUser((user: User, done) => done(null, user.username))
    passport.deserializeUser((username: string, done) => {
        getUser(username, (err, user) => {
            if (err) return done(err)
            return done(null, user)
        })
    })
}

const getUser = (username: string, callback: (error?: Error, user?: User) => any): void => {
    const repo = new UserRepository();
    repo.get(username, (err, user) => {
        if (err) return callback(err)
        callback(undefined, user)
    });
}