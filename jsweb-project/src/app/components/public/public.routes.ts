import {Routes} from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { NewsComponent } from '../news/news.component';

const routes : Routes=[
    {path:'news', component:NewsComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    { path: 'logout', component: LogoutComponent }
]

export {routes}