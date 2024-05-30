// import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { tap } from 'rxjs';
import { loginAuthService } from './services/login-auth.service';

// export const tokenHeadderInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };


@Injectable()
export class tokenHeaderInterceptor implements HttpInterceptor {
  constructor(private loginAuth: loginAuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // if ( req.url === "https://api.cloudinary.com/v1_1/doksixv16/image/upload"){
    //   return next.handle(req)
    // }
    let token = this.loginAuth.getToken()

    const newRequest = req.clone({
      setHeaders: {
        Token: token ? token : '',
      },
    });
    return next.handle(newRequest).pipe(
      tap(
        (response) => {

      },
      (error) => {
        if (error.status === 401 && error.error.message === "Invalid token, logOut")
        this.loginAuth.logout()
      })
    );
  }
}

