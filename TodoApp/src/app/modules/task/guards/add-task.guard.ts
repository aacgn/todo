import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthFacade } from '../../../core/auth/auth.facade';
import { UserRole } from 'src/app/core/auth/enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AddTaskGuard implements CanActivate {

  constructor(private authFacade: AuthFacade, private router: Router) { }

  canActivate() {
    const loggedUser = this.authFacade.getLoggedUser();
    if (loggedUser.id === null || loggedUser.fullName === null || loggedUser.role !== UserRole.ADMINISTRATOR) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
