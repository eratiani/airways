import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendUserService } from '../services/backend-user.service';
import { HeaderStateService } from '../core/services/header-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private backendUserService: BackendUserService,
    private headerService: HeaderStateService,
    private router:Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.backendUserService.loggedIn) {
        return true;
      } else {
        // If user is not logged in, redirect to the login page
        this.headerService.showAuth = true;
        
        return this.router.createUrlTree(['/Home']);
      }
    
  }
  
}
