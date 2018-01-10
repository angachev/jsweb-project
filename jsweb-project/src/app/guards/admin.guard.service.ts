import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route
} from '@angular/router';

import { AuthService } from '../services/authentication/auth.service';

@Injectable()
export class AdminGuard implements CanActivate, CanLoad {
  constructor(
    private authService : AuthService,
    private router : Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }
  
  checkLoggedIn(url : string) : boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/login']);
    this.authService.logout().subscribe(data=>{});
    return false;
  }
}