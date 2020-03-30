import UserDTO from "../models/UserDTO";

export default interface IUserRepository {
    create(user: UserDTO): number
    get(username: string): UserDTO
}