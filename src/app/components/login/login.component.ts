import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginAuthService } from '../../services/login-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  toVerify: boolean = false
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }
  constructor(
    private fb: FormBuilder,
    private authService: loginAuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false],
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

  onLogin() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      const keys = Object.keys(this.loginForm.controls);
      for (let i = 0; i < keys.length; i++) {
        if (this.loginForm.get(keys[i]).invalid) {
          // console.log(this.loginForm.get(keys[i]).touched);
          this.toastr.error(`${keys[i]} is not valid`, 'Invalid input');
        }
      }
    }
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          this.loginForm.get('rememberMe').value
            ? this.authService.setCookie(data)
            : this.authService.setSession(data);

          this.toastr.success('Welcome to my website');
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          if (
            err.error.message ===
            'Please enter your OTP to verify your account.\nYou can find it in your mail inbox'
          ) {
            this.sendOtp();
            this.toVerify = true;
            // this.toastr.error(err.error.message, 'Login Error');
          } else {
            this.toastr.error(err.error.message, 'Login Error');
          }
        },
      });
    }
  }
}
