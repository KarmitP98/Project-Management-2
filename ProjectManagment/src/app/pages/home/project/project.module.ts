import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProjectPageRoutingModule } from "./project-routing.module";

import { ProjectPage } from "./project.page";
import { AddTimeLogComponent } from "../../../components/add-time-log/add-time-log.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AddInvoiceComponent } from "../../../components/add-invoice/add-invoice.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   ProjectPageRoutingModule,
                   MatTooltipModule,
                   MatDatepickerModule,
                   MatInputModule
               ],
               declarations: [ ProjectPage,
                               AddTimeLogComponent,
                               AddInvoiceComponent ]
           } )
export class ProjectPageModule {}
