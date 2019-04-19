export class FoodEntry {
    public child_id: number;
    public date: string;
    public breakfast: number;
    public soup: number;
    public main_dish: number;

    constructor(child_id: number, date: string, breakfast: number, soup: number, main_dish: number) {
        this.child_id = child_id;
        this.date = date;
        this.breakfast = breakfast;
        this.soup = soup;
        this.main_dish = main_dish;
    }
}