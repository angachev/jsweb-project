import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { NewsService } from '../../../services/news/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private news =[];

  constructor(private authService:AuthService,private newsService:NewsService,private router:Router) { }

  ngOnInit() {
    this.newsService.getAllNews().subscribe(data=>{
      data.slice(0,3).forEach(element => {
        this.news.push(element)
      });
    })
  }

  readMore(newItem){
    this.router.navigate([`news/${newItem._id}`]);
  }

}
