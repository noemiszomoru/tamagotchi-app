import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

import { Child } from '../models/child.model';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';

import { DataStorageService } from '../shared/data.storage.service';
import { ChildWrapper } from '../models/child.wrapper.model';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';


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
  private selectedGroup: number = null;
  private child = new Child();

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router) {

    this.dataStorageService.getGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
    });

    this.dataStorageService.getUsers().subscribe((users: User[]) => {
      this.users = users;

    });

  }

  private id: number;

  loadChild() {

    if (this.id) {
      this.dataStorageService.getChild(this.id).subscribe((child: Child) => {
        this.child = child;
        this.selectedGroup = child.group_id;
        this.dataStorageService.getChildParent(this.id).subscribe((users: User[]) => {
          for (let user of users) {
            this.selectedUser = user;
            this.parents.push(this.selectedUser);
            console.log(this.parents);
          }
        });
      });
    }
  }

  ngOnInit() {
    console.log(this.route);

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = +params.get('id');
      }
    )
    console.log(this.id);

    this.loadChild();

  }

  onAddChild(form: NgForm) {

    const child = new Child(this.child.name, this.selectedGroup);
    if (this.id) {
      child.pk = this.id;
    }

    const newChildWrapper = new ChildWrapper(child);
    for (let parent of this.parents) {
      newChildWrapper.addParent(parent);
    }
    this.dataStorageService.saveChild(newChildWrapper).subscribe(() => {
      this.router.navigate(['children']);
    });
    console.log('asta de cate ori');

  }

  // onAddChild(form: NgForm) {
  //   const value = form.value;
  //   const newChildWrapper = new ChildWrapper(new Child(value.name, this.selectedGroup));
  //   for (let parent of this.parents) {
  //     newChildWrapper.addParent(parent);
  //   }
  //   this.dataStorageService.saveChild(newChildWrapper).subscribe(() => {
  //     this.router.navigate(['children']);
  //   });

  // }

  //called on button click
  onAddUser() {
    this.parents.push(this.selectedUser);
    this.cleanParents();
    this.selectedUser = null;
  }

  private cleanParents() {
    var cleanParents = [];
    var parentsMap: Map<User, User> = new Map();
    for (let parent of this.parents) {
      if (!parentsMap.has(parent)) {
        cleanParents.push(parent);
        parentsMap.set(parent, parent);
      }
    }
    this.parents = cleanParents;
  }

  onDelete() {
    this.dataStorageService.deleteChild(this.id).subscribe(() => {
      this.router.navigate(['children']);
    });

  }

  // onSave() {
  //   this.dataStorageService.saveChild(child).subscribe
  //   console.log(this.parents)
  // }

}
