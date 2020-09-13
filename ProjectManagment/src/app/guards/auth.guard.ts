import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "../services/data.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable( {
                 providedIn: "root"
             } )
export class AuthGuard implements CanActivate {

    constructor( private ds: DataService, private afa: AngularFireAuth, private router: Router ) {}

    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // let user;
        //
        // this.afa.user.subscribe( value => {user = value;
        //     console.log(value);} );
        //
        // console.log(user);
        // if ( !!user ) {
        return true;
        // } else {
        //     return this.router.navigate( [ "/login" ] );
        // }
    }
}
