import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";



import { RegisterComponent } from "./components/public/register/register.component";
import { LoginComponent } from "./components/public/login/login.component";
import { LogoutComponent } from "./components/public/logout/logout.component";


import { AuthGuard } from "./guards/auth.guard.service";
import { AdminGuard } from "./guards/admin.guard.service";

import { NewsComponent } from "./components/news/news.component";
import { NewsFormComponent } from "./components/forms/news-form/news-form.component";
import { ViewNewComponent } from "./components/forms/view-new/view-new.component";
import { UserListComponent } from "./components/admin/user-list/user-list.component";
import { UserViewComponent } from "./components/user/user-view/user-view.component";
import { HomeComponent } from "./components/public/home/home.component";


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'createNew',canActivate: [ AuthGuard ], component: NewsFormComponent },
    { path: 'news', canActivate: [ AuthGuard ], component: NewsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    {path:'home',canActivate: [ AuthGuard ],component:HomeComponent},
    {path:'news/:id',canActivate: [ AuthGuard ], component:ViewNewComponent},
    {path:'createNew/:id',canActivate: [ AuthGuard ],component:NewsFormComponent},
    {path:'admin/users',canActivate: [AdminGuard,AuthGuard],component:UserListComponent},
    {path:'user/:id',canActivate: [ AuthGuard ],component:UserViewComponent},
    {path:'newsSearch/:query',canActivate:[AuthGuard],component:NewsComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }