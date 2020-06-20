import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { AddProjectComponent } from "../../components/add-project/add-project.component";
import { AddMemberComponent } from "../../components/add-member/add-member.component";

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   HomePageRoutingModule
               ],
               declarations: [ HomePage,
                               AddProjectComponent,
                               AddMemberComponent ]
           } )
export class HomePageModule {}
