import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news/news.service';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { NewInputModel } from '../../../models/input-models/new-input.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news.form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {
  newForm: FormGroup
  private id;
  public titleMessage: string;
  public textMessage: string;
  private originalAuthor ;

  private titleValidationMessages = {
    required: 'Title is required!',
    minlength: 'Should be at least 4 symbols',
    maxlength: 'Should be less than 15 symbols'
  }

  private textValidationMessages = {
    required: 'Text is required!',
    maxlength: 'Should be less than 500 symbols'
  }

  constructor(private route: ActivatedRoute, private newsService: NewsService, private fb: FormBuilder, private router: Router) { }



  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id !== null) {
      
      this.newForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],

        text: ['', [Validators.required, Validators.maxLength(500)]]

      })
      
      this.newsService.getSingleNew(this.id).subscribe(data => {
        this.originalAuthor=data.author;
        this.newForm.setValue({title:data.title,text:data.text})
      }) 
     

    } else {
      this.newForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],

        text: ['', [Validators.required, Validators.maxLength(500)]]

      })
    }


    const titleControl = this.newForm.get('title');
    titleControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        this.setTitleMessage(titleControl)
      });


    const textControl = this.newForm.get('text');
    textControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        this.setTextMessage(textControl)
      });
  }

  setTitleMessage(c: AbstractControl): void {
    this.titleMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.titleMessage = Object.keys(c.errors)
        .map(key => this.titleValidationMessages[key])
        .join(' ');
    }
  }
  setTextMessage(c: AbstractControl): void {
    this.textMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.textMessage = Object.keys(c.errors)
        .map(key => this.textValidationMessages[key])
        .join(' ');
    }
  }

  submitNewForm(payload) {

    
      if (this.textMessage === '' && this.titleMessage === '') {
      if (this.id !== null) {
        let data = new NewInputModel(
          payload.value.title,
          payload.value.text,
          this.originalAuthor)
        this.newsService.editNew(this.id, data).subscribe(data => {
          
          this.router.navigate(['/news'])
        })
      } else {
        let data = new NewInputModel(
          payload.value.title,
          payload.value.text,
          localStorage.getItem('username'))

        this.newsService.postNew(data)
          .subscribe(data => {
           
          })
        this.router.navigate(['/news'])
      }
      
    }
    else{
      return
    }
  }

}
