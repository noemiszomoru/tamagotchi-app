import { Component, OnInit } from '@angular/core';
import { Token } from '../models/token';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.setToken(params.get('token'));
      }
    )
  }

  private setToken(token: string) {
    console.log(`Token set to ${token}`);
    localStorage.setItem(this.JWT_TOKEN, token);
    // localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
    this.router.navigate(['set-password']);
  }

}
