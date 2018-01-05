import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news/news.service';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NewInputModel } from '../../../models/input-models/new-input.model';

@Component({
  selector: 'app-news.form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {
  newForm: FormGroup

  constructor(private newsService: NewsService, private fb: FormBuilder, private router: Router) { }



  ngOnInit() {
    this.newForm = this.fb.group({
      title: ['', [Validators.required]],

      text: ['', [Validators.required]]

    })
  }

  submitNewForm(payload) {

    let data = new NewInputModel(
      payload.value.title,
      payload.value.text,
      localStorage.getItem('username'))


    this.newsService.postNew(data)
      .subscribe(data => {
        console.log('success')
        console.log('data')
      },
      err => {
        console.log(err)
      })
  }

}
