import { CanActivateFn, Router } from '@angular/router';
import { loginAuthService } from './services/login-auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = (route, state) => {
  const userService = inject(loginAuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService)

  if (userService.isUserLogged) return true;

  toastr.info("Please login or register if you don't have account");
  router.navigate(['/login']);
  return false;
};
