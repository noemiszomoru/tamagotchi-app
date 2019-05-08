import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';

import { Group } from '../../models/group.model';
import { DataStorageService } from '../../shared/data.storage.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-groups-edit',
  templateUrl: './groups-edit.component.html',
  styleUrls: ['./groups-edit.component.css']
})
export class GroupsEditComponent implements OnInit {
  // @ViewChild('f') gForm: NgForm;
  private group = new Group();


  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router) { }

  private id: number;
  private routerNavigationMonitor: Subscription;

  loadGroup() {

    if (this.id) {
      this.dataStorageService.getGroup(this.id).subscribe((group: Group) => {
        this.group = group;
        console.log(this.group);
      });

    }
  }

  // private processCurrentRoute = () => {

  //   if (this.route.firstChild) {
  //     this.id = this.route.firstChild.snapshot.params.Id;
  //     console.log(this.id);
  //   } else {
  //     this.id = 0;
  //   }

  //This is how you read the parameter value from the route child 
  // this.loadGroup();
  // }


  ngOnInit() {

    console.log(this.route);

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = +params.get('id');
      }
    )
    console.log(this.id);

    this.loadGroup();

    // this.processCurrentRoute();

    // this.routerNavigationMonitor = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
    //   this.processCurrentRoute();
    // });


  }

  onAddGroup(form: NgForm) {
    this.dataStorageService.saveGroup(this.group).subscribe(() => {
      this.router.navigate(['groups']);
    });

  }

  onDelete() {
    this.dataStorageService.deleteGroup(this.id).subscribe(() => {
      this.router.navigate(['groups']);
    });

  }

  // ngOnDestroy() {
  //   this.routerNavigationMonitor.unsubscribe();
  // }

}
