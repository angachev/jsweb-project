import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { LoginInputModel } from '../../../models/input-models/login-input.model';
import 'rxjs/add/operator/debounceTime';
import { UsersService } from '../../../services/users/users.service';
import { Router } from '@angular/router';
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordPattern=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private usernameValidationMessages = {
    required: 'Username is required!',
    minlength: 'Should be at least 3 symbols'
  }

  private passwordValidationMessages = {
    required: 'Password is required!',
    pattern: 'Should be atleast 8 symbols and contain atleast one letter and one number'
  }

  private emailValidationMessages = {
    required: 'Email is required!',
    pattern: 'Must be a valid email!'
  }

  private nameValidationMessages = {
    required: 'Name is required!',
    minlength: 'Must be atleast 3 symbols!',
    maxlength: 'Must be less than 12 symbols'
  }
  public registerForm: FormGroup
  private registeredUser: string;
  public usernameMessage: string;
  public emailMessage: string;
  public passwordMessage:string;
  public nameMessage:string;
  public userAlreadyExistsMessage;


  constructor(private fb: FormBuilder, private authService: AuthService,private usersService:UsersService,private router:Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(new RegExp(emailPattern))]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      password: ['', [Validators.required,Validators.pattern(new RegExp(passwordPattern))]]

    })

    const usernameControl = this.registerForm.get('username');
    usernameControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        this.setUsernameMessage(usernameControl)
      });


    const emailControl = this.registerForm.get('email');
    emailControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        this.setEmailMessage(emailControl)
      });

      const passwordControl = this.registerForm.get('password');
      passwordControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        this.setPasswordMessage(passwordControl)
      });
      const nameControl = this.registerForm.get('name');
      nameControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        this.setNameMessage(nameControl)
      });
  }
  setUsernameMessage(c: AbstractControl): void {
    this.usernameMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.usernameMessage = Object.keys(c.errors)
        .map(key => this.usernameValidationMessages[key])
        .join(' ');
    }
  }
  setEmailMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.emailValidationMessages[key])
        .join(' ');
    }
  }
  setPasswordMessage(c: AbstractControl): void {
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors)
        .map(key => this.passwordValidationMessages[key])
        .join(' ');
    }
  }
  setNameMessage(c: AbstractControl): void {
    this.nameMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.nameMessage = Object.keys(c.errors)
        .map(key => this.nameValidationMessages[key])
        .join(' ');
    }
  }



  submitRegisterForm(payload) {
    if(this.nameMessage===''&&this.emailMessage===''&&this.usernameMessage===''&&this.passwordMessage===''){
      
    this.authService.register(payload.value).subscribe(data => {
      this.successfulRegister(payload)
      
    })
    }else{
      return
    }
    
  }

  successfulRegister(payload): void {
    localStorage.clear();
    this.authService.login(new LoginInputModel(payload.value.username, payload.value.password)).subscribe(data=>{
          
    })
    this.router.navigate(['/login'])
  }

}
