import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { LogoutGuard } from "./guards/logout.guard";
import { LoginGuard } from "./guards/login-guard.guard";

const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        loadChildren: () => import("./pages/login/login.module").then( m => m.LoginPageModule ),
        canActivate: [ LoginGuard ]
    },
    {
        path: "signup",
        loadChildren: () => import("./pages/signup/signup.module").then( m => m.SignupPageModule ),
        canActivate: [ LoginGuard ]
    },
    {
        path: ":uId",
        loadChildren: () => import("./pages/home/home.module").then( m => m.HomePageModule ),
        canActivate: [ AuthGuard ],
        canDeactivate: [ LogoutGuard ]
    }
];

@NgModule( {
               imports: [
                   RouterModule.forRoot( routes, { preloadingStrategy: PreloadAllModules } )
               ],
               exports: [ RouterModule ]
           } )
export class AppRoutingModule {


}
