export class Group {
    public pk: number;
    public name: string;
    public description: string;

    constructor(pk: number, name: string, description: string) {
        this.pk = pk;
        this.name = name;
        this.description = description;
    }
}