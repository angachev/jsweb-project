import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { NewsService } from '../../services/news/news.service';
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news=[];

  constructor(private authService:AuthService,private newsService:NewsService,private router:Router, private activatedRouter:ActivatedRoute) {
  }

  ngOnInit() {
    
    if(this.activatedRouter.snapshot.paramMap.get('query')!==null){
      
      this.activatedRouter.params.subscribe(params=>{
        this.news=[];
        this.newsService.searchNews(params['query']).subscribe(data=>{
          data.forEach(element => {
            this.news.push(element)
          });
        })
      })
    }else{
    this.newsService.getAllNews().subscribe(data=>{
      data.forEach(element => {
        this.news.push(element)
      });
    })
    this.newsService.updateNews(this.news)
  }
  }
  noNews(){
    if(this.news.length===0){
      return true
    }
    else return false
  }

  readMore(newItem){
    this.router.navigate([`news/${newItem._id}`]);
  }

}
