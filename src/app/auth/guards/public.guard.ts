import { Injectable } from '@angular/core';
import { CanMatch, CanActivate, Router, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.sercive';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate{

   constructor(
    private AuthService: AuthService,
    private router: Router,
    ) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.AuthService.chechAththentication()
      .pipe(
        tap( isAuthenticated => console. log('Autheticated', isAuthenticated) ),
        tap( isAuthenticated => {
          if ( !isAuthenticated ) {
            this.router.navigate(['./'])
          }
        }),
      )
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean>   {
    //console.log('Can Match');
    //console.log({route, segments})
    return this.checkAuthStatus();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //console.log('Can Activate');
    //console.log({route,state})
    return false;
  }


}
