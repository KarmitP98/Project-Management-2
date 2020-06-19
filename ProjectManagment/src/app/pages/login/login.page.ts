import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component( {
                selector: "app-login",
                templateUrl: "./login.page.html",
                styleUrls: [ "./login.page.scss" ]
            } )
export class LoginPage implements OnInit {
    userEmail: string;
    userPassword: string;

    constructor( public ds: DataService,
                 private afa: AngularFireAuth ) { }

    ngOnInit() {
        this.afa.signOut();
        localStorage.removeItem( "userData" );
    }

    login(): void {
        this.ds.login( this.userEmail, this.userPassword );
        this.userPassword = null;
        this.userEmail = null;
    }
}
