import { CanActivateFn, Router } from '@angular/router';
import { loginAuthService } from './services/login-auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const userService = inject(loginAuthService)
  const router = inject(Router);

  if (userService.isUserLogged) {
    return true;
  }
  alert("Please login first")
  router.navigate(['/login'])
  return false;
};
