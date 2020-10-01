import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable( {
                 providedIn: "root"
             } )
export class LogoutGuard implements CanDeactivate<unknown> {

    constructor( private afa: AngularFireAuth ) {}

    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return new Promise( resolve => {
            var sub = this.afa.authState.subscribe( value => {
                if ( value ) {
                    sub.unsubscribe();
                    resolve( false );
                } else {
                    sub.unsubscribe();
                    resolve( true );
                }
            } );
        } );

    }

}
