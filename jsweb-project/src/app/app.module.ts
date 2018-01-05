import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms'
import { ServiceModule } from './services/services.module';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ErrorsComponent } from './components/shared/errors/errors.component';
import { SharedModule } from './components/shared/shared.module';
import { RegisterComponent } from './components/public/register/register.component';
import { PublicModule } from './components/public/public.module';
import { NewsFormComponent } from './components/forms/news-form/news-form.component';
import { NewsComponent } from './components/news/news.component';
import { NewsService } from './services/news/news.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorsComponent,
    NewsFormComponent,
    NewsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceModule,
    PublicModule
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
