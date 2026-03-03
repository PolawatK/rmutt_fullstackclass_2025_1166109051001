import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  onLogin(form: any) {
    if (form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'กรอกข้อมูลไม่ครบ',
        text: 'กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน'
      });
      return;
    }

    // แสดง loading
    Swal.fire({
      title: 'กำลังเข้าสู่ระบบ...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.login(form.value).subscribe({
      next: (res) => {

        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);

        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      error: (err) => {
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
        });
      }
    });
  }

  onRegister(form: any) {
    if (form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'กรอกข้อมูลไม่ครบ',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน'
      });
      return;
    }

    Swal.fire({
      title: 'กำลังสมัครสมาชิก...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.register(form.value).subscribe({
      next: (res) => {

        Swal.fire({
          icon: 'success',
          title: 'สมัครสมาชิกสำเร็จ',
          text: 'กรุณาเข้าสู่ระบบ',
          confirmButtonText: 'ไปหน้า Login'
        }).then(() => {
          this.activeTab = 'login';
        });

      },
      error: (err) => {
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'สมัครสมาชิกไม่สำเร็จ',
          text: 'อีเมลนี้ถูกใช้งานแล้ว'
        });
      }
    });
  }

}