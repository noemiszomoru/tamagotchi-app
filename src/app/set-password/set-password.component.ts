import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {



  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  private token: string;

  ngOnInit() {

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.token = params.get('token');
      }
    )
    console.log(this.token);
  }

  onSetPassword(form: NgForm) {
    this.authService.setPassword(form.value.password)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/food-sleep']);
        }
      });
  }

}
