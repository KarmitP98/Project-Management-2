import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProjectPageRoutingModule } from "./project-routing.module";

import { ProjectPage } from "./project.page";
import { AddTimeLogComponent } from "../../../components/add-time-log/add-time-log.component";

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   ProjectPageRoutingModule
               ],
               declarations: [ ProjectPage,
                               AddTimeLogComponent ]
           } )
export class ProjectPageModule {}
