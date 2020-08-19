import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LoginPageRoutingModule } from "./login-routing.module";

import { LoginPage } from "./login.page";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   LoginPageRoutingModule,
                   MatInputModule,
                   MatIconModule
               ],
               declarations: [ LoginPage ]
           } )
export class LoginPageModule {}
