import { Component, OnInit } from '@angular/core';

import { Child } from '../models/child.model';
import { DataStorageService } from '../shared/data.storage.service';
import { Group } from '../models/group.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.css']
})
export class ChildrenListComponent implements OnInit {
  private children: Child[] = [];
  children$: Observable<any>;

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router) {

    // this.dataStorageService.getChildren().subscribe((children: Child[]) => {
    //   this.children = children;
    // });

  }

  public groupId: number;
  private routerNavigationMonitor: Subscription;

  public loadList() {

    if (this.groupId) {
      this.dataStorageService.getChildren(this.groupId).subscribe((children: Child[]) => {
        this.children = children;
      });

    } else {
      this.dataStorageService.getChildren().subscribe((children: Child[]) => {
        this.children = children;
      });

    }

  }

  private processCurrentRoute = () => {
    this.children = [];

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

  onNewChild() {
    this.router.navigate(['new'], { relativeTo: this.route });
    console.log(1);
  }


  ngOnDestroy() {
    this.routerNavigationMonitor.unsubscribe();
  }

}
