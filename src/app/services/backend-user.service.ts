import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { UserData } from '../models/user.model';

const SERVER = 'http://localhost:3000';
type RespType = { accessToken: string; user: UserData };

@Injectable({
  providedIn: 'root',
})
export class BackendUserService {
  loggedIn = false;
  // token: string = '';
  userLocal: Partial<UserData> = {};

  constructor(private http: HttpClient) {}

  registerUser(user: Partial<UserData>) {
    return this.http.post<RespType>(`${SERVER}/register`, user).pipe(
      tap(({ accessToken, user: { email, id } }) => {
        this.setLoggin(accessToken, id, email);
      })
    );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<RespType>(`${SERVER}/login`, { email, password })
      .pipe(
        tap(({ accessToken, user: { id } }) => {
          this.setLoggin(accessToken, id, email);
        })
      );
  }
  logOut() {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }

  private setLoggin(token: string, id: number, email: string) {
    // this.token = token;
    this.loggedIn = true;
    this.userLocal = { email, id };
    localStorage.setItem('token', token);
  }
}
