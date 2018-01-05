import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { RegisterComponent } from "./components/public/register/register.component";
import { LoginComponent } from "./components/public/login/login.component";
import { LogoutComponent } from "./components/public/logout/logout.component";


import { AuthGuard } from "./guards/auth.guard.service";
import { NewsComponent } from "./components/news/news.component";
import { NewsFormComponent } from "./components/forms/news-form/news-form.component";


const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'createNew', component: NewsFormComponent },
    { path: 'news', component: NewsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }