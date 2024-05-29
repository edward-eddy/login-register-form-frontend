import { CanActivateFn, Router } from '@angular/router';
import { loginAuthService } from './services/login-auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const userService = inject(loginAuthService)
  const router = inject(Router);

  if (!userService.isUserLogged) return true;

  router.navigate(['/'])
  return false;
};
