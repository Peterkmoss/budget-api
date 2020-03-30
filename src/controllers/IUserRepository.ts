import UserDTO from "../models/UserDTO";

export default interface IUserRepository {
    create(user: UserDTO, callback: (code: number) => void): void
    get(username: string, callback: (user: UserDTO) => void): void
}