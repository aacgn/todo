import { Component } from '@angular/core';
import { AuthFacade } from './core/auth/auth.facade';
import { Router } from '@angular/router';

const APPLICATION_NAME = 'Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = APPLICATION_NAME;

  constructor(private authFacade: AuthFacade, private router: Router){}

  public get isUserLogged() {
    const loggedUser = this.authFacade.getLoggedUser()
    return loggedUser.id != null && loggedUser.fullName != null && loggedUser.role != null;
  }

  public logout() {
    const JWT_REFRESH_TOKEN = this.authFacade.getJwtRefreshToken();
    this.authFacade.logout(JWT_REFRESH_TOKEN)
    .subscribe(success => {
      if (success) {
        this.router.navigate(['/login']);
      }
    });
  }

}
