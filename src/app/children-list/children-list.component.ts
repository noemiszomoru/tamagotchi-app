import { Component, OnInit } from '@angular/core';

import { Child } from './child.model';
import { DataStorageService } from '../shared/data.storage.service';
import { Group } from '../groups-list/group.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.css']
})
export class ChildrenListComponent implements OnInit {
  private children: Child[] = [];

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute) {

    // this.dataStorageService.getChildren().subscribe((children: Child[]) => {
    //   this.children = children;
    // });

  }

  public groupId: number;
  private sub: any;

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

  ngOnInit() {
    this.children = [];

    console.log('Init');


    this.sub = this.route.paramMap.subscribe(params => {
      console.log('Sub: ' + JSON.stringify(params));
      this.groupId = +params['groupId']; // (+) converts string 'id' to a number
      this.loadList();

      // In a real app: dispatch action to load the details here.
    });


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
