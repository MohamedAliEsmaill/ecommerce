import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserServiceService } from './user-service.service';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService implements CanActivate {
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
