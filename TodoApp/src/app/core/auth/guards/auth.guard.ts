import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthFacade } from '../auth.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authFacade: AuthFacade, private router: Router) { }

  canActivate() {
    const loggedUser = this.authFacade.getLoggedUser();
    if (loggedUser.id !== null && loggedUser.fullName !== null && loggedUser.role !== null) {
      this.router.navigate(['/task']);
      return false;
    }
    return true;
  }
}
