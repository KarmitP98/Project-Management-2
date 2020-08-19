import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SignupPageRoutingModule } from "./signup-routing.module";

import { SignupPage } from "./signup.page";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   SignupPageRoutingModule,
                   MatFormFieldModule,
                   MatInputModule,
                   MatIconModule
               ],
               declarations: [ SignupPage ]
           } )
export class SignupPageModule {}
