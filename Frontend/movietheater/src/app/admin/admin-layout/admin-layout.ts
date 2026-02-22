import { Component } from '@angular/core';
import { Sidenav } from '../../share/sidenav/sidenav';
import { RouterOutlet } from '@angular/router';
import { Topbar } from '../../share/topbar/topbar';
@Component({
  selector: 'app-admin-layout',
  imports: [Sidenav,RouterOutlet,Topbar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

 
}
