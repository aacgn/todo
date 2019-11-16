import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthFacade } from '../../../core/auth/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class TaskListkGuard implements CanActivate {

  constructor(private authFacade: AuthFacade, private router: Router) { }

  canActivate() {
    const loggedUser = this.authFacade.getLoggedUser();
    if (loggedUser.id === null || loggedUser.fullName === null || loggedUser.role !== 'Administrator') {
      this.router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  }
}
