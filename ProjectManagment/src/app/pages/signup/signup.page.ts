import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserModel } from "../../shared/models";
import { AngularFireAuth } from "@angular/fire/auth";
import { pushTrigger } from "../../shared/animations";
import { NgForm } from "@angular/forms";

@Component( {
                selector: "app-signup",
                templateUrl: "./signup.page.html",
                styleUrls: [ "./signup.page.scss" ],
                animations: [ pushTrigger ]
            } )
export class SignupPage implements OnInit {

    userName: string;
    userEmail: string;
    userPassword: string;

    @ViewChild( "signForm", { static: false } ) signForm: NgForm;

    constructor( public ds: DataService,
                 private afa: AngularFireAuth ) { }

    ngOnInit() {
        this.afa.signOut();
        localStorage.removeItem( "userData" );
    }

    signUp(): void {
        const user: UserModel = { uId: "temp", uEmail: this.userEmail, uName: this.userName, uPassword: this.userPassword };
        this.ds.signUp( user );
        this.signForm.resetForm();
    }
}
