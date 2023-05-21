import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { UserData } from '../models/user.model';
import { Router } from '@angular/router';
import { RequestService } from './http-request.service';
import { SearchParamsType } from '../models/flyght-data.model';

@Injectable({
  providedIn: 'root',
})
export class BackendUserService {
  loggedIn = true; // to change to false
  userLocal: Partial<UserData> = { id: 4 }; // template id
  searchParams?: SearchParamsType;

  constructor(private request: RequestService, private router: Router) {}

  registerUser(user: Partial<UserData>) {
    return this.request.registerUser(user).pipe(
      tap(({ accessToken, user: { email, id } }) => {
        this.setLoggin(accessToken, id, email);
      })
    );
  }

  loginUser(email: string, password: string) {
    return this.request.login(email, password).pipe(
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
