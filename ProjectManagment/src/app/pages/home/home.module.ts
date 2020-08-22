import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { AddProjectComponent } from "../../components/add-project/add-project.component";
import { AddMemberComponent } from "../../components/add-member/add-member.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   HomePageRoutingModule,
                   MatFormFieldModule,
                   MatSelectModule,
                   MatInputModule,
                   MatIconModule,
                   MatDatepickerModule
               ],
               declarations: [ HomePage,
                               AddProjectComponent,
                               AddMemberComponent ]
           } )
export class HomePageModule {}
