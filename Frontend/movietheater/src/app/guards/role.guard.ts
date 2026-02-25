import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class Roleguard implements CanActivate{

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate(): boolean{
        const roleId = this.auth.getRoleId();

        if (roleId === 2){
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}