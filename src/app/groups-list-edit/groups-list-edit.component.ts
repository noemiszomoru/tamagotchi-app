import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Group } from '../models/group.model';

@Component({
  selector: 'app-groups-list-edit',
  templateUrl: './groups-list-edit.component.html',
  styleUrls: ['./groups-list-edit.component.css']
})
export class GroupsListEditComponent implements OnInit {
  // @ViewChild('f') gForm: NgForm;
  private groups: Group[] = [];

  constructor() { }

  ngOnInit() {
  }

  onAddGroup(form: NgForm) {
    const value = form.value;
    const newGroup = new Group(value.name, value.description);
    this.groups.push(newGroup);

  }

}
