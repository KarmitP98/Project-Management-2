import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../guards/auth.guard";

const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboard.module").then( m => m.DashboardPageModule ),
        canActivate: [ AuthGuard ]
    },
    {
        path: "clients",
        loadChildren: () => import("./clients/clients.module").then( m => m.ClientsPageModule ),
        canActivate: [ AuthGuard ]
    },
    {
        path: ":pId",
        loadChildren: () => import("./project/project.module").then( m => m.ProjectPageModule )
    }


];

@NgModule( {
               imports: [ RouterModule.forChild( routes ) ],
               exports: [ RouterModule ]
           } )
export class HomePageRoutingModule {}
