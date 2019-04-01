import { Component, OnInit } from '@angular/core';

import { FoodSleep } from './food-sleep.model';
import { DataStorageService } from '../shared/data.storage.service';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-food-sleep-list',
  templateUrl: './food-sleep-list.component.html',
  styleUrls: ['./food-sleep-list.component.css']
})
export class FoodSleepListComponent implements OnInit {
  private food_sleep: FoodSleep[] = [];
  food_sleep$: Observable<any>;

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router) { }

  public groupId: number;
  private routerNavigationMonitor: Subscription;

  public loadList() {

    if (this.groupId) {
      this.dataStorageService.getFoodSleepList(this.groupId).subscribe((food_sleep: FoodSleep[]) => {
        this.food_sleep = food_sleep;
      });

    } else {
      this.dataStorageService.getFoodSleepList().subscribe((food_sleep: FoodSleep[]) => {
        this.food_sleep = food_sleep;
      });

    }

  }

  private processCurrentRoute = () => {
    this.food_sleep = [];

    if (this.route.firstChild) {
      this.groupId = this.route.firstChild.snapshot.params.groupId;
    } else {
      this.groupId = 0;
    }

    //This is how you read the parameter value from the route child 
    this.loadList();
  }

  ngOnInit() {

    this.processCurrentRoute();

    this.routerNavigationMonitor = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.processCurrentRoute();
    });

  }

  ngOnDestroy() {
    this.routerNavigationMonitor.unsubscribe();
  }

}
