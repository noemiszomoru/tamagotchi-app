import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        return this.authService.isLoggedIn();
        // if (this.authService.isLoggedIn()) {
        //     this.router.navigate(['/food-sleep']);
        // }
        // return !this.authService.isLoggedIn();
    }
}