export class Child {
    public pk: number;
    public name: string;
    public group_id: number;
    public parent_id?: number;

    constructor(name: string = '', group_id: number = 0, parent_id?: number) {
        this.name = name;
        this.group_id = group_id;
        this.parent_id = parent_id;
    }
}