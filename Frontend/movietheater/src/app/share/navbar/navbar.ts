import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  
  menuValue = false;

      toggle() {
       this.menuValue = !this.menuValue;
       
      }

  userName: string | null = null;
  showLogout = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

 ngOnInit(): void {
  this.loadUser();
}

loadUser(){
  const user = this.authService.getUser();

  if(user){
   this.userName = user.name;
  }
}

  toggleLogout(){
    this.showLogout = !this.showLogout;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}