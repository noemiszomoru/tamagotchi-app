import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data.storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: User[] = [];

  constructor(private dataStorageService: DataStorageService, private router: Router, private route: ActivatedRoute) {

    this.dataStorageService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  ngOnInit() {
  }

  onNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
    console.log(1);
  }

}
