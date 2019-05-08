import { Component, OnInit, Input } from '@angular/core';
import { DataStorageService } from '../shared/data.storage.service';
import { formatDate } from '@angular/common';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onGetData() {
    this.dataStorageService.getGroups();
  }

  onLogout() {
    this.authService.logout(this.authService.REFRESH_TOKEN)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/login']);
        }
      });
  }

}
