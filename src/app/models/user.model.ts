export class User {
    public pk: number = 0;
    public name: string;
    public role: string;
    public email: string;
    public username: string;

    constructor(name: string, role: string, email: string, username: string) {
        this.name = name;
        this.role = role;
        this.email = email;
        this.username = username;
    }
}