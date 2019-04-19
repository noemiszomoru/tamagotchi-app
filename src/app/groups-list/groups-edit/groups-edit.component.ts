import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Group } from '../../models/group.model';
import { DataStorageService } from '../../shared/data.storage.service';


@Component({
  selector: 'app-groups-edit',
  templateUrl: './groups-edit.component.html',
  styleUrls: ['./groups-edit.component.css']
})
export class GroupsEditComponent implements OnInit {
  // @ViewChild('f') gForm: NgForm;
  private groups: Group[] = [];

  constructor(private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() {
  }

  onAddGroup(form: NgForm) {
    const value = form.value;
    const newGroup = new Group(value.name, value.description);
    // this.groups.push(newGroup);
    this.dataStorageService.saveGroup(newGroup).subscribe(() => {
      this.router.navigate(['groups']);
    });

  }

}
