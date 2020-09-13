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
import { MemberComponent } from "../../../components/member/member.component";
import { WorkLogComponent } from "../../../components/work-log/work-log.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { EditWorkLogComponent } from "../../../components/work-log/edit-work-log/edit-work-log.component";

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
                   MatButtonModule,
                   MatExpansionModule
               ],
               declarations: [ ProjectPage,
                               MemberComponent,
                               WorkLogComponent,
                               EditWorkLogComponent ]
           } )
export class ProjectPageModule {}
