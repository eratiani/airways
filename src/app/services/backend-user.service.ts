import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { UserData } from '../models/user.model';

const SERVER = 'http://localhost:3000';
type RespType = { accessToken: string; user: Pick<UserData, 'email' | 'id'> };

@Injectable({
  providedIn: 'root',
})
export class BackendUserService {
  private loggedIn = false;
  private token: string = '';
  private userLocal = {
    _id: 0,
    email: '',
  };

  constructor(
    private http: HttpClient // private router: Router // private store: Store<AppState>
  ) {}

  registerUser(email: string, password: string) {
    return this.http
      .post<RespType>(`${SERVER}/register`, { email, password })
      .pipe(
        tap(({ accessToken, user: { email, id } }) => {
          this.token = accessToken;
          this.loggedIn = true;
          this.userLocal = { email, _id: id };
        })
      );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<RespType>(`${SERVER}/login`, { email, password })
      .pipe(
        tap(({ accessToken, user: { id } }) => {
          this.token = accessToken;
          this.loggedIn = true;

          this.token = accessToken;
          this.userLocal = { email, _id: id };

          localStorage.setItem('token', this.token); // or store in ngrx
        })
      );

    // localStorage.setItem('logedIn', `false`);
    // localStorage.setItem('userName', user.login);
  }
}
