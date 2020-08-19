import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../../services/data.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { pushTrigger } from "../../shared/animations";
import { NgForm } from "@angular/forms";

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
                 private afa: AngularFireAuth ) { }

    ngOnInit() {
        this.afa.signOut();
        localStorage.removeItem( "userData" );
    }

    login(): void {
        this.ds.login( this.userEmail, this.userPassword );
        this.loginForm.resetForm();
    }
}
