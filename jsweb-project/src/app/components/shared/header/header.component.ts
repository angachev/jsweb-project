import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private search : FormGroup

  constructor(private authService : AuthService,private fb: FormBuilder,private router:Router,private zone : NgZone) { }

  ngOnInit() {
    this.search=this.fb.group({
      query: ['', [Validators.required]]
    })
  }
  searchNews(query){
    this.router.navigate([`/newsSearch/${query.value.query}`])
  }

}
