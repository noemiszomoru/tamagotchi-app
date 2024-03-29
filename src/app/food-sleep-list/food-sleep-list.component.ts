import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { FoodSleep } from '../models/food-sleep.model';
import { DataStorageService } from '../shared/data.storage.service';

import { ActivatedRoute, Router, NavigationEnd, ParamMap } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Group } from '../models/group.model';

@Component({
  selector: 'app-food-sleep-list',
  templateUrl: './food-sleep-list.component.html',
  styleUrls: ['./food-sleep-list.component.css']
})
export class FoodSleepListComponent implements OnInit {
  private groups: Group[] = [];
  private group: Group;
  private selectedGroup: number = null;
  private food_sleep: FoodSleep[] = [];
  food_sleep$: Observable<any>;
  date: Date;
  dateHeader: string;
  dateIdentifier: string;

  images = ['../assets/food.png', '../assets/half-food.png', '../assets/empty-food.png', '../assets/food-null.png', '../assets/food2.png'];

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router) {

    this.dataStorageService.getGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
      console.log(this.groups);
    });

  }

  // public groupId: number;
  public date_param: string;
  private routerNavigationMonitor: Subscription;

  public loadList() {

    // if (this.groupId) {
    this.dataStorageService.getFoodSleepList(this.dateIdentifier).subscribe((food_sleep: FoodSleep[]) => {
      this.food_sleep = food_sleep;
      console.log(this.dateIdentifier);
      console.log(this.food_sleep);
      console.log(`Records loaded ... OK`);
    });

    // } else {
    //   this.dataStorageService.getFoodSleepList().subscribe((food_sleep: FoodSleep[]) => {
    //     this.food_sleep = food_sleep;
    //   });

    // }

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
  }

  //   this.dataStorageService.getFoodSleepList(this.dateIdentifier, group.pk).subscribe((food_sleep: FoodSleep[]) => {
  //     this.food_sleep = food_sleep;
  //     console.log(this.dateIdentifier);
  //     console.log(this.food_sleep);
  //     console.log(`Records loaded ... OK`);
  //   });
  // }


  //   }
  //   this.dataStorageService.getFoodSleepList(this.dateIdentifier, this.group).subscribe((food_sleep: FoodSleep[]) => {
  //     this.food_sleep = food_sleep;
  //     console.log(this.dateIdentifier);
  //     console.log(this.food_sleep);
  //     console.log(`Records loaded ... OK`);
  //   });
  // }

  // onFrasinClick() {
  //   // this.groups[0].pk
  //   this.dataStorageService.getFoodSleepList(this.dateIdentifier, this.groups[0].pk).subscribe((food_sleep: FoodSleep[]) => {
  //     this.food_sleep = food_sleep;
  //     console.log(this.dateIdentifier);
  //     console.log(this.food_sleep);
  //     console.log(`Records loaded ... OK`);
  //   });
  // }

  // onStejarClick() {
  //   // this.groups[0].pk
  //   this.dataStorageService.getFoodSleepList(this.dateIdentifier, this.groups[1].pk).subscribe((food_sleep: FoodSleep[]) => {
  //     this.food_sleep = food_sleep;
  //     console.log(this.dateIdentifier);
  //     console.log(this.food_sleep);
  //     console.log(`Records loaded ... OK`);
  //   });

  ngOnInit() {
    this.updateDate(new Date());
    console.log(`Default date set to  ${this.dateIdentifier}`);

    this.processCurrentRoute();

    this.routerNavigationMonitor = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.processCurrentRoute();
    });

    // this.getDate();
  }

  private processCurrentRoute = () => {
    this.food_sleep = [];

    if (this.route.firstChild) {
      console.log('...');
      let date_param = this.route.firstChild.snapshot.params.date;
      if (date_param != 'today') {
        var dateParts = date_param.split('-', '?');
        console.log(dateParts);
        if (dateParts.length == 3) {
          this.updateDate(new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`));
        }
        console.log(`Date set from param to ${this.dateIdentifier}`);
      }
    }

    //This is how you read the parameter value from the route child 
    this.loadList();
  }

  onGroupClick(ev: Event) {
    if (ev.currentTarget instanceof HTMLElement) {
      const groupPk = parseInt(ev.currentTarget.getAttribute('data-group'));
      this.dataStorageService.getFoodSleepList(this.dateIdentifier, groupPk).subscribe((food_sleep: FoodSleep[]) => {
        this.food_sleep = food_sleep;
      });

    }
  }


  ngOnDestroy() {
    this.routerNavigationMonitor.unsubscribe();
  }

}
