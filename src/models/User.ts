class User {
    username: string;
    salt: string;
    password: string;

    constructor(username: string, salt: string, password: string) {
        this.username = username;
        this.salt = salt;
        this.password = password;
    }
}

export default User