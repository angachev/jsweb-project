import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { ViewNewComponent } from './components/forms/view-new/view-new.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { UsersService } from './services/users/users.service';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { AuthGuard } from './guards/auth.guard.service';
import { AdminGuard } from './guards/admin.guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorsComponent,
    NewsFormComponent,
    NewsComponent,
    ViewNewComponent,
    UserListComponent,
    UserViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceModule,
    PublicModule,
    BrowserAnimationsModule, 
    ToastModule.forRoot()
  ],
  providers: [NewsService,UsersService,AuthGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
