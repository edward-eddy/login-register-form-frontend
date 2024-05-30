import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserLogin } from '../models/user-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class loginAuthService {
  userLoggedBehavior: BehaviorSubject<boolean>;
  httpHeader = {};

  get isUserLogged(): boolean {
    let token = this.getToken();
    return token ? true : false;
  }

  constructor(private httpClient: HttpClient, private router: Router) {
    this.userLoggedBehavior = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  register(userData: any): Observable<any> {
    return this.httpClient.post(
      `${environment.BAseApiURL}/userAuth/register`,
      userData,
      this.httpHeader
    ).pipe(
      retry(3)
    )
  }

  sendOtp(email: any): Observable<any> {
    return this.httpClient.post(`${environment.BAseApiURL}/send-otp`, {
      email,
    });
  }

  login(loginData: any): Observable<object> {
    const { email, password } = loginData;
    return this.httpClient
      .post(
        `${environment.BAseApiURL}/userAuth/login`,
        { email, password },
        this.httpHeader
      )
      .pipe(
        retry(3)
      );
  }
  setSession(authResult) {
    sessionStorage.setItem('token', authResult.token);
  }
  setCookie(authResult) {
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + authResult.expires_at);
    document.cookie = `token=${authResult.token};expires=${expiryDate}`;
  }
  logout() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    // case remember me
    document.cookie = `token=null;expires=${date}`;
    // normal case
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  getToken() {
    const sessionToken = sessionStorage.getItem('token');
    let cookies = document.cookie.split(/[;=]/);
    let cookiesToken =
      cookies.indexOf('token') !== -1
        ? cookies[cookies.indexOf('token') + 1]
        : null;
    return sessionToken ? sessionToken : cookiesToken;
  }
}
