import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Child } from '../models/child.model';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';

import { DataStorageService } from '../shared/data.storage.service';


@Component({
  selector: 'app-children-list-edit',
  templateUrl: './children-list-edit.component.html',
  styleUrls: ['./children-list-edit.component.css']
})
export class ChildrenListEditComponent implements OnInit {
  private children: Child[] = [];
  private groups: Group[] = [];
  private users: User[] = [];

  constructor(private dataStorageService: DataStorageService) {

    this.dataStorageService.getGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
    });

    this.dataStorageService.getUsers().subscribe((users: User[]) => {
      this.users = users;

    });

  }

  ngOnInit() {


  }

  onAddChild(form: NgForm) {
    const value = form.value;
    const newChild = new Child(value.name, value.group);
    this.children.push(newChild);

  }

  onAddParent() {

  }

  onRemoveParent() {

  }

}
