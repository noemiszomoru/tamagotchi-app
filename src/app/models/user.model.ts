export class User {
    // public pk: number;
    public role: string;
    public name: string;
    public email: string;
    public username: string;

    constructor(/*pk: number*/role: string, name: string, email: string, username: string) {
        // this.pk = pk;
        this.role = role;
        this.name = name;
        this.email = email;
        this.username = username;
    }
}