import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router
   ) {  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],

      password: ['', [Validators.required]]

    })
  }
  submitLoginForm(payload) {
    this.authService.login(payload.value)
      .subscribe(data => {
        this.successfulLogin(data)
      }
      , err => {
      })
  }

  successfulLogin(data): void {
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.clear();
    localStorage.setItem('authtoken', data['_kmd']['authtoken'])
    localStorage.setItem('username', data['username']);
    if (data['_kmd']['roles'] !== undefined) {
      localStorage.setItem('roles', data['_kmd']['roles'][0]['roleId'])
    }
    //this.loginFail=false;
    this.router.navigate(['/'])
  }

}
