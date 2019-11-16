import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../../auth.facade';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authFacade: AuthFacade, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authFacade.login(this.loginForm.value.userName, this.loginForm.value.password)
    .subscribe(success => {
      if (success) {
        this.router.navigate(['/task']);
      }
    });
  }

}
