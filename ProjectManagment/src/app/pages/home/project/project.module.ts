import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProjectPageRoutingModule } from "./project-routing.module";

import { ProjectPage } from "./project.page";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   ProjectPageRoutingModule,
                   MatTooltipModule,
                   MatDatepickerModule,
                   MatInputModule,
                   MatTableModule,
                   MatButtonModule
               ],
               declarations: [ ProjectPage ]
           } )
export class ProjectPageModule {}
