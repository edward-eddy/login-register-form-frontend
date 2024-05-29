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
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  onLogin() {
    if (!this.loginForm.valid)
    this.loginForm.markAllAsTouched();
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
          this.toastr.error(err.error.message, 'Login Error');
        },
      });
    }
  }
}
