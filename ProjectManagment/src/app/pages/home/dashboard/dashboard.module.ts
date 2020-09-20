import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DashboardPageRoutingModule } from "./dashboard-routing.module";

import { DashboardPage } from "./dashboard.page";
import { MenuCompComponent } from "../../../components/menu-comp/menu-comp.component";
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
               exports: [
                   MenuCompComponent
               ],
               declarations: [ DashboardPage, MenuCompComponent ]
           } )
export class DashboardPageModule {}
