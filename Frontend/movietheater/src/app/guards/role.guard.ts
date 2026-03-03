import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class Roleguard implements CanActivate{

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const requiredRole = route.data['role'];
        const userRole = this.auth.getRoleId();

        if (userRole === requiredRole) {
        return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}