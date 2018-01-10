import { Component, OnInit } from '@angular/core';
import { NewInputModel } from '../../../models/input-models/new-input.model';
import { ActivatedRoute,Router } from '@angular/router';
import { NewsService } from '../../../services/news/news.service';
import { AuthService } from '../../../services/authentication/auth.service';
@Component({
  selector: 'app-view-new',
  templateUrl: './view-new.component.html',
  styleUrls: ['./view-new.component.css']
})
export class ViewNewComponent implements OnInit {
  private newNew={} ;
  private id;
  private creator;

  constructor(private route:ActivatedRoute,private authService:AuthService ,private newsService:NewsService,private router:Router) { }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    this.newsService.getSingleNew(this.id).subscribe(data=>{
      this.creator=data.author;
      this.newNew=new NewInputModel(data.title,data.text,data.author)
    })
  }

  deleteNew(){
    this.newsService.deleteNew(this.id).subscribe(data=>{});
    this.router.navigate(['/news'])
  }

  editNew(){
    this.router.navigate([`/createNew/${this.id}`])
  }

}
