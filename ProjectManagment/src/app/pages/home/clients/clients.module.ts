import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ClientsPageRoutingModule } from "./clients-routing.module";

import { ClientsPage } from "./clients.page";
import { MenuCompComponent } from "../../../components/menu-comp/menu-comp.component";
import { DashboardPageModule } from "../dashboard/dashboard.module";

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   ClientsPageRoutingModule,
                   DashboardPageModule
               ],
               declarations: [ ClientsPage, MenuCompComponent ]
           } )
export class ClientsPageModule {}
