import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FoodSleep, IFoodSleep } from '../models/food-sleep.model';
import { Observable, Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data.storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { TimepickerComponent } from '../food-sleep-item/timepicker/timepicker.component';

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.css']
})
export class ParentViewComponent implements OnInit {
  @Input("time") time: TimepickerComponent;

  images = ['../assets/food.png', '../assets/half-food.png', '../assets/empty-food.png', '../assets/food-null.png', '../assets/food2.png'];

  private food_sleep: FoodSleep[] = [];
  food_sleep$: Observable<any>;
  date: Date;
  dateHeader: string;
  dateIdentifier: string;
  timeDiff: number;
  public timeSlept = {
    hour: 13,
    minute: 30
  };
  formattedTime = '13:00';

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router) { }

  // public groupId: number;
  public date_param: string;
  private routerNavigationMonitor: Subscription;

  pad(value, character, length) {
    value = String(value);
    while (value.length < length) {
      value = character + value;
    }
    return value;
  }

  updateComponent() {
    //this.timepicker.innerHTML = this.time.hour + ':' + this.time.minute;
    this.formattedTime = this.pad(this.timeSlept.hour, '0', 2) + ':' + this.pad(this.timeSlept.minute, '0', 2);
  }

  public loadChild() {

    // if (this.groupId) {
    this.dataStorageService.getFoodSleepList(this.dateIdentifier).subscribe((food_sleep: IFoodSleep[]) => {
      this.food_sleep = FoodSleep.createAll(food_sleep);
    });

  }

  nextDate() {
    let newDate = this.date;
    newDate.setDate(newDate.getDate() + 1);

    if (newDate.getDay() === 0) {
      newDate.setDate(newDate.getDate() + 2);
    }
    else if (newDate.getDay() === 6) {
      newDate.setDate(newDate.getDate() + 2);
    }

    this.updateDate(newDate);
  }

  previousDate() {
    let newDate = this.date;

    newDate.setDate(newDate.getDate() - 1);
    if (newDate.getDay() === 0) {
      newDate.setDate(newDate.getDate() - 2);
    }
    else if (newDate.getDay() === 6) {
      newDate.setDate(newDate.getDate() - 2);
    }
    this.updateDate(newDate);
  }

  private formatDateHeader(date: Date): string {
    return formatDate(date, 'EEE, d\'th\' of MMM', 'en');
  }

  private formatDateIdentifier(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en');
  }

  private updateDate(date: Date) {
    this.date = date;
    this.dateHeader = this.formatDateHeader(this.date);
    this.dateIdentifier = this.formatDateIdentifier(this.date);
    this.loadChild();
  }



  ngOnInit() {
    this.updateDate(new Date());
    console.log(`Default date set to  ${this.dateIdentifier}`);

    // this.processCurrentRoute();

    // this.routerNavigationMonitor = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
    //   this.processCurrentRoute();
    // });

    // this.getDate();

    this.loadChild();

  }
}
