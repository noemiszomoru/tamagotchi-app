import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Group } from '../models/group.model';
import { DataStorageService } from '../shared/data.storage.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css'],
})
export class GroupsListComponent implements OnInit {
  private groups: Group[] = [];

  constructor(private dataStorageService: DataStorageService, private router: Router, private route: ActivatedRoute) {

    this.dataStorageService.getGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
    });

  }

  ngOnInit() {
  }

  onNewGroup() {
    this.router.navigate(['new'], { relativeTo: this.route });
    console.log(1);
  }

}
