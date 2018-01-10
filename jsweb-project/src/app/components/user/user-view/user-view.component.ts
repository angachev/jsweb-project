import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { UserModel } from '../../../models/user/user.model';
import { NewsService } from '../../../services/news/news.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  private id;
  private user={};
  private news =[];
  constructor(private route:ActivatedRoute,private usersService: UsersService , private router: Router,private newsService:NewsService) { }

  ngOnInit() {
    this.id =this.route.snapshot.paramMap.get('id')
    this.usersService.getSingleUser(this.id).subscribe(data=>{
      
      this.user = new UserModel(data.username,data.email,data.name)
    })

    this.newsService.getAllNews().subscribe(data=>{
      data.filter(a=>a['_acl']['creator']===this.id).forEach(element => {
        this.news.push(element)
      });
      
    })
  } 
  readMore(newItem){
    this.router.navigate([`news/${newItem._id}`]);
  }

}
