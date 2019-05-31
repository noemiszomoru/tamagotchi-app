import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data.storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  private users: User[] = [];
  roles = ['admin', 'teacher', 'parent'];
  private user = new User();
  private selectedRole: string = '';

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router) { }

  private id: number;

  loadUser() {

    if (this.id) {
      this.dataStorageService.getUser(this.id).subscribe((user: User) => {
        this.user = user;
        this.selectedRole = user.role;
        // this.dataStorageService.getGroup(child.group_id).subscribe((group: Group) => {
        //   this.selectedGroup = group;
        //   console.log(this.selectedGroup);
        // });
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

    this.loadUser();

  }

  onAddUser(form: NgForm) {
    const value = form.value;
    const newUser = new User(value.name, value.role, value.email, value.username);
    // this.groups.push(newGroup);
    this.dataStorageService.saveUser(newUser).subscribe(() => {
      this.router.navigate(['users']);
    });

  }

  onDelete() {
    this.dataStorageService.deleteUser(this.id).subscribe(() => {
      this.router.navigate(['users']);
    });

  }

}
