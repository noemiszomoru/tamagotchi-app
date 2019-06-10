import { Time } from '@angular/common';

export interface IFoodSleep {
    pk: number;
    name: string;
    group_id: number;
    date: string;
    breakfast: number;
    soup: number;
    main_dish: number;
    start_at: number;
    end_at: number;
}

export class FoodSleep implements IFoodSleep {
    public pk: number;
    public name: string;
    public group_id: number;
    public date: string;
    public breakfast: number;
    public soup: number;
    public main_dish: number;
    public start_at: number;
    public end_at: number;

    constructor(name: string, group_id: number, date: string, breakfast: number, soup: number, main_dish: number, start_at: number, end_at: number) {
        this.name = name;
        this.group_id = group_id;
        this.date = date;
        this.breakfast = breakfast;
        this.soup = soup;
        this.main_dish = main_dish;
        this.start_at = start_at;
        this.end_at = end_at;
    }

    public static create(data: IFoodSleep) {
        return new FoodSleep(
            data.name,
            data.group_id,
            data.date,
            data.breakfast,
            data.soup,
            data.main_dish,
            data.start_at,
            data.end_at
        );
    }

    public static createAll(data: IFoodSleep[]) {
        const list: FoodSleep[] = [];
        for (let item of data) {
            list.push(FoodSleep.create(item));
        }
        return list;
    }

    public get sleepDuration(): string {
        const timeDiff = this.end_at - this.start_at
        const timeSlept = {
            hour: Math.floor(timeDiff / 60),
            minute: timeDiff % 60
        };

        const formattedTime = this.pad(timeSlept.hour, '0', 2) + ':' + this.pad(timeSlept.minute, '0', 2);
        console.log(formattedTime)

        return formattedTime;
    }

    public get sleepStartTime(): string {
        const time = {
            hour: Math.floor(this.start_at / 60),
            minute: this.start_at % 60
        };

        const formattedTime = this.pad(time.hour, '0', 2) + ':' + this.pad(time.minute, '0', 2);
        console.log(formattedTime)

        return formattedTime;
    }

    public get sleepEndTime(): string {
        const time = {
            hour: Math.floor(this.end_at / 60),
            minute: this.end_at % 60
        };

        const formattedTime = this.pad(time.hour, '0', 2) + ':' + this.pad(time.minute, '0', 2);
        console.log(formattedTime)

        return formattedTime;
    }



    private pad(value, character, length) {
        value = String(value);
        while (value.length < length) {
            value = character + value;
        }
        return value;
    }

}