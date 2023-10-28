import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CustomerGuard implements CanActivate{
  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');
    if(!token){
      this.router.navigate(['/login']);
      return false;
    }
    if(role != 'Customer'){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

// export const customerGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   const token = localStorage.getItem('accessToken');
//   const role = localStorage.getItem('role');
//   if(!token){
//     return false;
//   }
//   if(role != 'Customer'){
//     return false;
//   }
//   return true;
// };
