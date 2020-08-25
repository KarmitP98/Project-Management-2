import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProjectPage } from "./project.page";
import { AuthGuard } from "../../../guards/auth.guard";

const routes: Routes = [
    {
        path: "",
        component: ProjectPage,
        children: [
            {
                path: ":mUId",
                loadChildren: () => import("./member/member.module").then( m => m.MemberPageModule ),
                canActivate: [ AuthGuard ]
            } ]
    }

];

@NgModule( {
               imports: [ RouterModule.forChild( routes ) ],
               exports: [ RouterModule ]
           } )
export class ProjectPageRoutingModule {}
