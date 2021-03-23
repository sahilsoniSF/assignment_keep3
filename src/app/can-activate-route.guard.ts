import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service' 
import { RouterService } from './services/router.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(
      private authService:AuthenticationService,
      private routerService : RouterService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      return this.authService.isUserAuthenticated(this.authService.getBearerToken())
      .pipe ( map(data=>{
        if(data['isAuthenticated'])
        return true;
        this.routerService.routeToLogin()
      }
      ));
  }
}

