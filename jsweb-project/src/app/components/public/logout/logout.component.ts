import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit() {
    this.authService.logout().subscribe(data=>{
      localStorage.clear();
      this.router.navigate(['/login'])
    })
  }

}
