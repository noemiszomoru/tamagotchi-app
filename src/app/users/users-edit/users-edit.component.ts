import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data.storage.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  private users: User[] = [];
  roles = ['Admin', 'Teacher', 'Parent'];

  constructor(private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() {
  }

  onAddUser(form: NgForm) {
    const value = form.value;
    const newUser = new User(value.name, value.role, value.email, value.username);
    // this.groups.push(newGroup);
    this.dataStorageService.saveUser(newUser).subscribe(() => {
      this.router.navigate(['users']);
    });

  }

}
