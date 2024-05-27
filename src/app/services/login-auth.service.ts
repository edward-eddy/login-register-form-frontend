import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loginAuthService{
  userLoggedBehavior: BehaviorSubject<boolean>

  get isUserLogged(): boolean{
    return (localStorage.getItem("userToken"))? true : false;
  }

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    this.userLoggedBehavior =  new BehaviorSubject<boolean>(this.isUserLogged)
  }

  register(userData:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  sendOtp(email:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { email });
  }

  login(loginData: any){
    let token = "1234567890"
    localStorage.setItem("userToken", token)
    this.userLoggedBehavior.next(true)
    console.log(this.userLoggedBehavior);

  }
  logout(){
    localStorage.removeItem("userToken")
    this.userLoggedBehavior.next(false)
  }
}
