import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {RouterModule} from '@angular/router'
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { ErrorsComponent } from "./errors/errors.component";


@NgModule({
    imports:[
        CommonModule,
        RouterModule
    ],
    declarations:[
        HeaderComponent,
        FooterComponent,
        ErrorsComponent
    ],
    exports:[]
})

export class SharedModule{}