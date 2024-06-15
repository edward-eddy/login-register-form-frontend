import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateProfile(profileData): Observable<any> {
    return this.http.post(
      `${environment.BAseApiURL}/userData/updateUserDetails`,
      { profileData }
    );
  }

  getUserById(): Observable<any> {
    return this.http.get(`${environment.BAseApiURL}/userData/getUserById`);
  }

  getCountries(): Observable<any> {
    return this.http.get("./assets/countries.json");
}
}
