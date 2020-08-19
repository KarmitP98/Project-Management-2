import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProjectPageRoutingModule } from "./project-routing.module";

import { ProjectPage } from "./project.page";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { ViewWorkLogComponent } from "../../../components/view-work-log/view-work-log.component";
import { MatTableModule } from "@angular/material/table";
import { ViewInvoiceComponent } from "../../../components/view-invoice/view-invoice.component";
import { WorkAdderComponent } from "../../../components/work-adder/work-adder.component";
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
               declarations: [ ProjectPage,
                               ViewWorkLogComponent,
                               ViewInvoiceComponent,
                               WorkAdderComponent ]
           } )
export class ProjectPageModule {}
