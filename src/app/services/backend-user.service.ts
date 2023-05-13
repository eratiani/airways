import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { UserData } from '../models/user.model';
import { Router } from '@angular/router';

const SERVER = 'http://localhost:3000';
type RespType = { accessToken: string; user: UserData };

@Injectable({
  providedIn: 'root',
})
export class BackendUserService {
  loggedIn = false;
  userLocal: Partial<UserData> = {};

  constructor(private http: HttpClient, private router: Router) {}

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
    window.sessionStorage.removeItem('airways-token');
    this.router.navigateByUrl('/');
  }

  private setLoggin(token: string, id: number, email: string) {
    this.loggedIn = true;
    this.userLocal = { email, id };
    window.sessionStorage.setItem('airways-token', token);
  }
}
