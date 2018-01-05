import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder,FormGroup,AbstractControl} from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { LoginInputModel } from '../../../models/input-models/login-input.model';
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup
  private registeredUser:string;

  constructor(private fb:FormBuilder,private authService:AuthService) { }

  ngOnInit() {
    this.registerForm=this.fb.group({
      username:['', [Validators.required,Validators.minLength(3),Validators.maxLength(12)] ],
      email:['',[Validators.required,Validators.pattern(new RegExp(emailPattern))]],
      name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
      password:['',[Validators.required]]
      
  })
}
  

  submitRegisterForm(payload){
    
    console.log(payload)
    this.authService.register(payload.value).subscribe(data=>{
      console.log(data)
      this.successfulRegister(data);
      console.log('registered')
      this.authService.login(new LoginInputModel(payload.value.username,payload.value.password))
    },err=>{
      console.log(err.message)
    })
  }
  successfulRegister(data):void{
    this.registeredUser=data['username'];
  }

}
