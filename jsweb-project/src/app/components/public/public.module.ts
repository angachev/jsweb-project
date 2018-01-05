import { NgModule } from "@angular/core";
import {routes} from './public.routes';
import {RouterModule} from '@angular/router'
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from "../../services/authentication/auth.service";


@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations:[
        LoginComponent,
        RegisterComponent,
        LogoutComponent
    ],
    exports:[],
    providers:[AuthService]
})

export class PublicModule{}