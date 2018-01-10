import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { Router } from '@angular/router';
import { NewsService } from '../../../services/news/news.service';
const ADMIN_ROLE = "17d946b5-80eb-4aa4-8f2a-2c04ee068d51"

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private users = []
  constructor(private usersService: UsersService, private router: Router, private newsService: NewsService) { }

  ngOnInit() {
    this.users = [];
    this.usersService.getAllUsers().subscribe(data => {
      data.filter(a => a['_kmd']['roles'] === undefined).forEach(element => {
        this.users.push(element)
      });
    })
  }
  viewProfile(user) {
    this.router.navigate([`user/${user._id}`]);
  }
  updateUsers(){
    this.users = [];
          this.usersService.getAllUsers().subscribe(data => {
            data.filter(a => a['_kmd']['roles'] === undefined).forEach(element => {
              this.users.push(element)
            });
          })
  }
  deleteUser(user) {
    this.usersService.deleteUser(user._id).subscribe(data => { })
    this.newsService.getAllNews().subscribe(data => {
      data.filter(a => a['_acl']['creator'] === user._id).forEach(element => {
        this.newsService.deleteNew(element['_id']).subscribe(data => {
          
        })
      });
    })
    this.router.navigate(['/news']);

  }

}
