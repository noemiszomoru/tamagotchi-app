import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FoodSleep } from '../models/food-sleep.model';
import { DataStorageService } from '../shared/data.storage.service';
import { Router } from '@angular/router';
import { FoodEntry } from '../models/food-entry.model';
import { formatDate } from '@angular/common';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { SleepEntry } from '../models/sleep-entry.model';

@Component({
  selector: 'app-food-sleep-item',
  templateUrl: './food-sleep-item.component.html',
  styleUrls: ['./food-sleep-item.component.css']
})
export class FoodSleepItemComponent implements OnInit {
  @ViewChild("start") start: TimepickerComponent;
  @ViewChild("end") end: TimepickerComponent;

  @Input() food_sleepEl: FoodSleep;
  @Input() dateIdentifier: string;
  image_br = '../assets/food.png';
  image_soup = '../assets/food.png';
  image_md = '../assets/food.png';
  images = ['../assets/food.png', '../assets/half-food.png', '../assets/empty-food.png'];
  breakfast_values = [0, 0.5, 1];
  soup_values = [0, 0.5, 1];
  main_dish_values = [0, 0.5, 1];

  constructor(private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() {

  }

  onTimeMove() {
    const sleep_entry = new SleepEntry(this.food_sleepEl.pk, this.dateIdentifier, this.start.dragTime, this.end.dragTime);
    this.dataStorageService.addSleepData(sleep_entry).subscribe(() => {
      this.router.navigate(['food-sleep']);
    });
    console.log(sleep_entry);
  }

  onFoodClick() {
    const food_entry = new FoodEntry(this.food_sleepEl.pk, this.dateIdentifier, this.food_sleepEl.breakfast, this.food_sleepEl.soup, this.food_sleepEl.main_dish);
    this.dataStorageService.addFoodData(food_entry).subscribe(() => {
      this.router.navigate(['food-sleep']);
    });
    console.log('backend');
    console.log(this.food_sleepEl.pk);

  }

  onImageClickBr() {
    if (this.image_br == this.images[0]) {
      this.image_br = this.images[1];
      this.food_sleepEl.breakfast = this.breakfast_values[1];
      this.onFoodClick();
    }
    else if (this.image_br == this.images[1]) {
      this.image_br = this.images[2];
      this.food_sleepEl.breakfast = this.breakfast_values[0];
      this.onFoodClick();
    }
    else {
      this.image_br = this.images[0];
      this.food_sleepEl.breakfast = this.breakfast_values[2];
      this.onFoodClick();
    }
  }

  onImageClickSoup() {
    if (this.image_soup == this.images[0]) {
      this.image_soup = this.images[1];
      this.food_sleepEl.soup = this.soup_values[1];
      this.onFoodClick();
    }
    else if (this.image_soup == this.images[1]) {
      this.image_soup = this.images[2];
      this.food_sleepEl.soup = this.soup_values[0];
      this.onFoodClick();
    }
    else {
      this.image_soup = this.images[0];
      this.food_sleepEl.soup = this.soup_values[2];
      this.onFoodClick();
    }
  }

  onImageClickMd() {
    if (this.image_md == this.images[0]) {
      this.image_md = this.images[1];
      this.food_sleepEl.main_dish = this.main_dish_values[1];
      this.onFoodClick();
    }
    else if (this.image_md == this.images[1]) {
      this.image_md = this.images[2];
      this.food_sleepEl.main_dish = this.main_dish_values[0];
      this.onFoodClick();
    }
    else {
      this.image_md = this.images[0];
      this.food_sleepEl.main_dish = this.main_dish_values[2];
      this.onFoodClick();
    }
  }

}