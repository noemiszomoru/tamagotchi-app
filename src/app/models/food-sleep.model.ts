import { Time } from '@angular/common';

export class FoodSleep {
    public pk: number;
    public name: string;
    public group_id: number;
    public date: string;
    public breakfast: number;
    public soup: number;
    public main_dish: number;
    public start_at: Time;
    public end_at: Time;

    constructor(name: string, group_id: number, date: string, breakfast: number, soup: number, main_dish: number, start_at: Time, end_at: Time) {
        this.name = name;
        this.group_id = group_id;
        this.date = date;
        this.breakfast = breakfast;
        this.soup = soup;
        this.main_dish = main_dish;
        this.start_at = start_at;
        this.end_at = end_at;
    }
}