import User from "../User";

export default interface IUserRepository {
    create(user: User, callback: (error?: Error, user?: User) => any): void
    get(username: string, callback: (error?: Error, user?: User) => any): void
}