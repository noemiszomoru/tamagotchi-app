import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roles = ['Admin', 'Teacher', 'Parent'];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    this.authService.register(
      {
        name: form.value.name,
        role: form.value.role,
        email: form.value.email,
        username: form.value.username,
        password: form.value.password
      }
    )
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/food-sleep']);
          console.log('merge?');
        }
      });
  }

}
