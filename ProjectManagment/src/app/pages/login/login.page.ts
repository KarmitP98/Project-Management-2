import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../../services/data.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { pushTrigger } from "../../shared/animations";
import { NgForm } from "@angular/forms";
import { Platform } from "@ionic/angular";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Router } from "@angular/router";

@Component( {
                selector: "app-login",
                templateUrl: "./login.page.html",
                styleUrls: [ "./login.page.scss" ],
                animations: [ pushTrigger ]
            } )
export class LoginPage implements OnInit {

    userEmail: string;
    userPassword: string;
    @ViewChild( "loginForm", { static: false } ) loginForm: NgForm;

    constructor( public ds: DataService,
                 private afa: AngularFireAuth,
                 public platform: Platform,
                 private googlePlus: GooglePlus,
                 private router: Router ) { }

    ngOnInit() {
    }

    login(): void {
        this.ds.loginWithEmailandPassword( this.userEmail, this.userPassword );
        this.loginForm.resetForm();
    }

    loginWithProvider( provider: string ) {
        if ( this.platform.is( "cordova" ) ) {
            this.nativeGoogleLogin();
        } else {
            this.ds.loginWithProvider( provider );
            this.loginForm.resetForm();
        }
    }

    nativeGoogleLogin() {
        try {
            this.googlePlus.login( {
                                       "webClientId": "966004184266-tjmbcdltaovh32qctqujgagv9pr31t80.apps.googleusercontent.com",
                                       "scopes": "profile email",
                                       "offline": true
                                   } )
                .then( res => console.log( res ) );
        } catch ( e ) {

        }
        // .catch( err => console.error( err.message ) );


        // this.gplus.login( {
        //                       "webClientId": "966004184266-tjmbcdltaovh32qctqujgagv9pr31t80.apps.googleusercontent.com",
        //                       "scopes": "profile email"
        //                   } ).then( value => {
        //     // console.log( value );
        //     // this.afa.signInWithCredential( firebase.auth.GoogleAuthProvider.credential( value.idToken ) )
        //     //     .then( value1 => {console.log( value1 );} )
        //     //     .catch( e => {console.log( e.errorCode );} );
        // } );
    }
}
