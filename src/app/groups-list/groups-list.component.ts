import { Component, OnInit } from '@angular/core';

import { Group } from './group.model';
import { DataStorageService } from '../shared/data.storage.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css'],
})
export class GroupsListComponent implements OnInit {
  private groups: Group[] = [];

  constructor(private dataStorageService: DataStorageService) { 

    this.dataStorageService.getGroups().subscribe((groups : Group[])=>{
      this.groups = groups;
    });

  }

  ngOnInit() {


  }

}
