import { Component, OnInit, TRANSLATIONS_FORMAT } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  onLogin(form: NgForm) {
    this.authService.login(
      {
        username: form.value.username,
        password: form.value.password
      }
    )
      .subscribe(() => {
        if (this.authService.userRole === 'parent') {
          this.router.navigate(['/parent']);
        } else if (this.authService.userRole === 'teacher') {
          this.router.navigate(['/food-sleep']);
        }
        console.log(this.authService.userRole);
      });
  }

}
