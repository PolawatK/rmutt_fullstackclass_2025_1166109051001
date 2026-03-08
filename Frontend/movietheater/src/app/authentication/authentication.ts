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
        title: 'Incomplete Information',
        text: 'Please enter both your email and password'
      });
      return;
    }

    // แสดง loading
    Swal.fire({
      title: 'Logging in...',
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
          title: 'Login Success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
        this.router.navigate(['/']).then(() => {
        window.location.reload();   
        });
     });
      },
      error: (err) => {
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'Incorrect email or password'
        });
      }
    });
  }

  onRegister(form: any) {
    if (form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please fill in all the information'
      });
      return;
    }

    Swal.fire({
      title: 'Signing up...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.register(form.value).subscribe({
      next: (res) => {

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Please log in',
          confirmButtonText: 'Go to Login'
        }).then(() => {
          this.activeTab = 'login';
        });

      },
      error: (err) => {
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Register Fail',
          text: 'Email already in use'
        });
      }
    });
  }

}