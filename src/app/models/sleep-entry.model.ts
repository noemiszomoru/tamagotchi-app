export class SleepEntry {
    public child_id: number;
    public date: string;
    public start_at: number;
    public end_at: number;


    constructor(child_id: number, date: string, start_at: number, end_at: number) {
        this.child_id = child_id;
        this.date = date;
        this.start_at = start_at;
        this.end_at = end_at;
    }
}