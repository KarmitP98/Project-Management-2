import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DashboardPageRoutingModule } from "./dashboard-routing.module";

import { DashboardPage } from "./dashboard.page";
import { TooltipsModule } from "ionic4-tooltips";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   DashboardPageRoutingModule,
                   TooltipsModule,
                   MatTooltipModule
               ],
               declarations: [ DashboardPage ]
           } )
export class DashboardPageModule {}
