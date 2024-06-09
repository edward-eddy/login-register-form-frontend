import { loginAuthService } from './../../services/login-auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(loginAuthService);
  private toastr = inject(ToastrService);
  otp: Number;
  @Input() email;
  @Input() password;
  @Input() rememberMe;

  verifyOtp() {
    this.http
      .post(`${environment.BAseApiURL}/userAuth/verifyOtp`, {
        otp: this.otp,
        email: this.email.value,
      })
      .subscribe({
        next: (response: { message: string }) => {
          this.toastr.success(response.message, 'Thank You');
          this.authService
            .login({ email: this.email.value, password: this.password.value })
            .subscribe({
              next: (data) => {
                this.rememberMe?.value
                  ? this.authService.setCookie(data)
                  : this.authService.setSession(data);
                this.router.navigateByUrl('/');
              },
              error: (err) => {
                this.toastr.error(err.error.message, 'Login Error');
              },
            });
        },
        error: (error: any) => {
          console.log(error.error.message);
          this.toastr.error(error.error.message);
        },
      });
  }
  sendOtp() {
    this.authService.sendOtp(this.email.value)
      .subscribe({
        next: (response: { message: string }) => {
          // console.log('sendOtp next', response);
          this.toastr.success(response.message, 'Thank You');
        },
        error: (error: { message }) => {
          // console.log(error.message);
          this.toastr.error(error.message);
        },
      });
  }
}
