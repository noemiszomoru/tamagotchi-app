import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Child } from '../models/child.model';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';

import { DataStorageService } from '../shared/data.storage.service';
import { ChildWrapper } from '../models/child.wrapper.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-children-list-edit',
  templateUrl: './children-list-edit.component.html',
  styleUrls: ['./children-list-edit.component.css']
})
export class ChildrenListEditComponent implements OnInit {
  private groups: Group[] = [];
  private users: User[] = [];
  private selectedUser: User = null;
  private parents: User[] = [];
  private selectedGroup: Group = null;

  constructor(private dataStorageService: DataStorageService, private router: Router) {

    this.dataStorageService.getGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
    });

    this.dataStorageService.getUsers().subscribe((users: User[]) => {
      this.users = users;

    });

  }

  ngOnInit() {
    console.log('... child edit');
  }

  onAddChild(form: NgForm) {
    const value = form.value;
    const newChildWrapper = new ChildWrapper(new Child(value.name, this.selectedGroup.pk));
    for (let parent of this.parents) {
      newChildWrapper.addParent(parent);
    }
    this.dataStorageService.saveChild(newChildWrapper).subscribe(() => {
      this.router.navigate(['children']);
    });

  }

  //called on button click
  onAddUser() {
    this.parents.push(this.selectedUser);
    this.cleanParents();
    this.selectedUser = null;
  }

  private cleanParents() {
    var cleanParents = [];
    var parentsMap: Map<number, User> = new Map();
    for (let parent of this.parents) {
      if (!parentsMap.has(parent.pk)) {
        cleanParents.push(parent);
        parentsMap.set(parent.pk, parent);
      }
    }
    this.parents = cleanParents;
  }

  // onSave() {
  //   this.dataStorageService.saveChild(child).subscribe
  //   console.log(this.parents)
  // }

}
