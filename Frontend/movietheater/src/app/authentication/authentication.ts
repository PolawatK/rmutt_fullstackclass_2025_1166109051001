import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authentication.html',
  styleUrls: ['./authentication.css']
})
export class Authentication {

  activeTab: 'login' | 'register' = 'login';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  setTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }

  // 🔐 LOGIN
  onLogin(form: any) {
    if (form.invalid) return;

    this.authService.login(form.value).subscribe({
      next: (res) => {

        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);

        console.log('Login success');

        this.router.navigate(['/'])
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // 📝 REGISTER (เพิ่มอันนี้เข้าไป)
  onRegister(form: any) {
    if (form.invalid) return;

    this.authService.register(form.value).subscribe({
      next: (res) => {
        console.log('Register success');

        alert('สมัครสมาชิกสำเร็จ');

        // สมัครเสร็จแล้วสลับกลับไปหน้า login
        this.activeTab = 'login';
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}