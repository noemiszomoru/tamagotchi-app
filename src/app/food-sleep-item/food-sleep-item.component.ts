import { Component, OnInit, Input } from '@angular/core';

import { FoodSleep } from '../models/food-sleep.model';
import { DataStorageService } from '../shared/data.storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-sleep-item',
  templateUrl: './food-sleep-item.component.html',
  styleUrls: ['./food-sleep-item.component.css']
})
export class FoodSleepItemComponent implements OnInit {
  @Input() food_sleepEl: FoodSleep;
  image_br = '../assets/food.png';
  image_soup = '../assets/food.png';
  image_md = '../assets/food.png';
  images = ['../assets/food.png', '../assets/half-food.png', '../assets/empty-food.png'];
  br_value = 0;
  soup_value = 0;
  main_dish_value = 0;
  breakfast_values = [0, 0.5, 1];
  soup_values = [0, 0.5, 1];
  main_dish_values = [0, 0.5, 1];

  constructor(private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() {
  }

  onImageClickBr() {
    if (this.image_br == this.images[0]) {
      this.image_br = this.images[1];
      this.br_value = this.breakfast_values[1];
    }
    else if (this.image_br == this.images[1]) {
      this.image_br = this.images[2];
      this.br_value = this.breakfast_values[2];
    }
    else {
      this.image_br = this.images[0];
      this.br_value = this.breakfast_values[0];
    }
  }

  onImageClickSoup() {
    if (this.image_soup == this.images[0]) {
      this.image_soup = this.images[1];
    }
    else if (this.image_soup == this.images[1]) {
      this.image_soup = this.images[2];
    }
    else {
      this.image_soup = this.images[0];
    }
  }

  onImageClickMd() {
    if (this.image_md == this.images[0]) {
      this.image_md = this.images[1];
    }
    else if (this.image_md == this.images[1]) {
      this.image_md = this.images[2];
    }
    else {
      this.image_md = this.images[0];
    }
  }

  onFoodClick() {
    this.food_sleepEl.breakfast = this.br_value;
    this.dataStorageService.addFoodData(this.food_sleepEl).subscribe(() => {
      this.router.navigate(['food-sleep']);
    });

  }

}
