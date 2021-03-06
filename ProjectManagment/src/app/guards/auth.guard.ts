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

        return new Promise( resolve => {
            var sub = this.afa.user.subscribe( value => {
                if ( value ) {
                    sub.unsubscribe();
                    resolve( true );
                } else {
                    sub.unsubscribe();
                    resolve( this.router.navigate( [ "/login" ] ) );
                }
            } );
        } );
    }
}
