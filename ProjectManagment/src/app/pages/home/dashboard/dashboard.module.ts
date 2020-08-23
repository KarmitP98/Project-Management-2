import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DashboardPageRoutingModule } from "./dashboard-routing.module";

import { DashboardPage } from "./dashboard.page";
import { MenuCompComponent } from "../../../components/menu-comp/menu-comp.component";

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   DashboardPageRoutingModule
               ],
               exports: [
                   MenuCompComponent
               ],
               declarations: [ DashboardPage, MenuCompComponent ]
           } )
export class DashboardPageModule {}
