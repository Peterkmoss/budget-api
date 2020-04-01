import User from "../../models/User";

export default interface UserRepositoryInterface {
    create(user: User, callback: (user: User) => void): void
    get(username: string, callback: (user: User) => void): void
}