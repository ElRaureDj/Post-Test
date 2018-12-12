import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(){

   return this.authService.isAuth().pipe(switchMap(user =>
    {
      if(user){
        return of(true);
      }else{
        this.router.navigate(['/login']);
         return of(false);
      }
    }));

  }
}
