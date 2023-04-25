import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, firstValueFrom } from 'rxjs';
import { UserSent } from '../models/user-sent';
import { UserReceived } from '../models/user-received';

@Injectable({
  providedIn: 'root',
})
export class BackendUserService {
  private baseUrl: string =
    'https://final-task-backend-production-d9d3.up.railway.app';
  private loggedIn = false;
  private token: { token: string } = {
    token: '',
  };
  userLocal: UserReceived = {
    _id: '',
    name: '',
    login: '',
  };
  userLogedIn!: boolean;
  name!: string;
  userStatus!: Subscription;
  userStatusChanged = new Subject<string>();
  userLogedInChanged = new Subject<boolean>();
  userName!: Subscription;
  constructor(
    private http: HttpClient,
    private router: Router // private store: Store<AppState>
  ) {}

  async registerUser(user: UserSent) {
    const request = await firstValueFrom(
      this.http.post(`${this.baseUrl}/auth/signup`, user)
    );

    return request;
  }

  async loginUser(user: UserSent) {
    const request = (await firstValueFrom(
      this.http.post(`${this.baseUrl}/auth/signin`, user)
    )) as { token: string };
    // this.store.dispatch(logedIn({ user: user }));

    this.loggedIn = true;
    this.userName = this.userStatusChanged.subscribe((userName: string) => {
      this.name = userName;
    });
    this.userStatus = this.userLogedInChanged.subscribe((status: boolean) => {
      this.userLogedIn = status;
    });
    this.userLogedInChanged.next(true);
    this.userStatusChanged.next(user.login);
    this.token = request;
    this.setLocalUser(user, request);
    localStorage.setItem('token', this.token.token);
    localStorage.setItem('logedIn', `false`);
    localStorage.setItem('userName', user.login);

    return request;
  }
  private async setLocalUser(user: UserSent, token: { token: string }) {
    const userArr: UserReceived[] = (await this.getUsers(
      token
    )) as UserReceived[];

    const userGot = userArr.filter((e) => e.login === user.login);
    this.userLocal = { ...userGot[0] };
  }
  async getUsers(token: { token: string }) {
    const request = await firstValueFrom(
      this.http.get(`${this.baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
          'Content-Type': 'application/json',
        },
      })
    );
    return request;
  }
}
