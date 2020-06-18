import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserModel } from "../../shared/models";
import { AngularFireAuth } from "@angular/fire/auth";

@Component( {
                selector: "app-signup",
                templateUrl: "./signup.page.html",
                styleUrls: [ "./signup.page.scss" ]
            } )
export class SignupPage implements OnInit {

    userName: string;
    userEmail: string;
    userPassword: string;

    constructor( public ds: DataService,
                 private afa: AngularFireAuth ) { }

    ngOnInit() {
        this.afa.signOut();
        localStorage.removeItem( "userData" );
    }

    signUp(): void {
        const user: UserModel = { uId: "temp", uEmail: this.userEmail, uName: this.userName, uPassword: this.userPassword };
        this.ds.signUp( user );
        this.userPassword = null;
        this.userName = null;
        this.userEmail = null;
    }
}
