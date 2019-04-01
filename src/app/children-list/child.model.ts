export class Child {
    public pk: number;
    public name: string;
    public group_id: number;

    constructor(pk: number, name: string, group_id: number) {
        this.pk = pk;
        this.name = name;
        this.group_id = group_id;
    }
}