import { Component } from '@angular/core';
import { Sidenav } from '../../share/sidenav/sidenav';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-layout',
  imports: [Sidenav,RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

}
