import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginAuthService } from '../../services/login-auth.service';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm);

      this.authService.login(this.loginForm.value);
      // this.router.navigateByUrl('../')
      this.router.navigate(['']);

      // this.authService.login(this.loginForm.value).subscribe(
      //   response => {
      //     console.log('Login successful', response);
      //     this.router.navigate(['/profile-edit']);
      //   },
      //   error => {
      //     console.error('Login failed', error);
      //   }
      // );
    }
  }
}
