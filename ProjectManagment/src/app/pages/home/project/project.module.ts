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
import { RaiseInvoiceComponent } from "../../../components/invoice/raise-invoice/raise-invoice.component";
import { InvoiceComponent } from "../../../components/invoice/invoice.component";
import { ProjectReportComponent } from "../../../components/project-report/project-report.component";
import { FusionChartsModule } from "angular-fusioncharts";
import { ChartsModule } from "ng2-charts";

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
                   MatExpansionModule,
                   ChartsModule,
                   FusionChartsModule
               ],
               declarations: [ ProjectPage,
                               MemberComponent,
                               WorkLogComponent,
                               EditWorkLogComponent,
                               RaiseInvoiceComponent,
                               InvoiceComponent,
                               ProjectReportComponent ]
           } )
export class ProjectPageModule {}
