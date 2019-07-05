import { CanActivate, Router, CanLoad, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import decode from 'jwt-decode';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;

        if (this.authService.userRole === 'admin') {
            return true;
        }

        if (Array.isArray(expectedRole)) {
            return expectedRole.indexOf(this.authService.userRole) !== -1;
        }

        return expectedRole === this.authService.userRole;

        const token = localStorage.getItem('JWT_TOKEN');
        // decode the token to get its payload
        const tokenPayload = decode(token);
        console.log(token);
        console.log(tokenPayload.role);
        if (
            !this.authService.isLoggedIn() ||
            tokenPayload.role !== expectedRole
        ) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;

    }

    // canActivate() {
    //     return this.canLoad();
    // }

    // canLoad() {
    //     if (!this.authService.isLoggedIn()) {
    //         this.router.navigate(['/login']);
    //     }
    //     return this.authService.isParent();
    // }
}