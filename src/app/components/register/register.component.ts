import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginAuthService } from '../../services/login-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  toVerify: boolean = false

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get mobile() {
    return this.registerForm.get('mobile');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get terms() {
    return this.registerForm.get('terms');
  }
  get emailVerification() {
    return this.registerForm.get('emailVerification');
  }
  get smsVerification() {
    return this.registerForm.get('smsVerification');
  }

  constructor( private formBuilder: FormBuilder, private authService: loginAuthService, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, this.checkPasswords.bind(this)]],
        terms: [false, Validators.requiredTrue],
        emailVerification: [false],
        smsVerification: [false]
      },
    );
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { match: true };
  }

  onRegister() {

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      const keys = Object.keys(this.registerForm.controls);
      for (let i = 0; i < keys.length; i++) {
        if (this.registerForm.get(keys[i]).invalid){
          // console.log(this.registerForm.get(keys[i]).touched);
          this.toastr.error(`${keys[i]} is not valid`, 'Invalid input' );
        }
      };
    }
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (data) => {
          this.toastr.success(data.message)
          this.toVerify = true
          console.log(data);
        },
        error: (err) => {
          // console.log(err.error.error.errors[0].message);
          this.toastr.error(JSON.stringify(err.error.error.errors[0].message), 'Register Error' );
        },
      }
      );
    }
  }
}
