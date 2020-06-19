import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ClientModel, ProjectModel, UserModel } from "../shared/models";
import { ToastController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable( {
                 providedIn: "root"
             } )
export class DataService {

    userSubject = new BehaviorSubject<UserModel>( null );
    loadingSubject = new BehaviorSubject<boolean>( false );

    constructor( private afs: AngularFirestore,
                 private tc: ToastController,
                 private afa: AngularFireAuth,
                 private router: Router ) { }

    login( email, password ) {
        this.loadingSubject.next( true );
        this.afa.signInWithEmailAndPassword( email, password )
            .then( () => {
                let tempSub = this.fetchUsers( "uEmail", "==", email )
                                  .subscribe( users => {
                                      localStorage.setItem( "userData", JSON.stringify( users[0].uId ) );
                                      this.router.navigate( [ "/" + users[0].uId ] );
                                      this.loadingSubject.next( false );
                                      tempSub.unsubscribe();
                                  } );
            } )
            .catch( ( err ) => {
                this.showToast( err.message, 3000, "danger" );
                this.loadingSubject.next( false );
            } );

    }

    signUp( user: UserModel ) {
        this.loadingSubject.next( true );
        this.afa.createUserWithEmailAndPassword( user.uEmail, user.uPassword )
            .then( () => {
                this.addNewUser( user );
            } )
            .catch( ( err ) => {
                this.showToast( err.message, 3000, "danger" );
                this.loadingSubject.next( false );
            } );
    }

    logOut() {
        this.afa.signOut().then( value => {
            localStorage.removeItem( "userData" );  // Clear local storage
            this.router.navigate( [ "/login" ] ).then( () => console.log( "User has been logged out!" ) );
        } ).catch();
    }

    fetchUsers( child?, condition?, value? ) {
        if ( child ) {
            return this.afs
                       .collection<UserModel>( "users", ref => ref.where( child, condition, value ) )
                       .valueChanges();
        } else {
            return this.afs.collection<UserModel>( "users" ).valueChanges();
        }
    }

    addNewUser( user: UserModel ) {
        user.uId = this.afs.createId();
        this.afs.collection<UserModel>( "users" )
            .doc( user.uId )
            .set( user )
            .then( () => {
                localStorage.setItem( "userData", JSON.stringify( user.uId ) );
                this.showToast( "New User Added!!!", 1000 );
                this.loadingSubject.next( false );
                this.router.navigate( [ "/" + user.uId ] );
            } );

    }

    updateUser( user: UserModel ) {
        this.afs.collection<UserModel>( "users" )
            .doc( user.uId )
            .update( user );
    }

    addNewClient( client: ClientModel ) {
        client.cId = this.afs.createId();

        this.afs.collection<ClientModel>( "clients" )
            .doc( client.cId )
            .set( client );
    }

    fetchClients( child?, condition?, value? ) {
        if ( child ) {
            return this.afs.collection<ClientModel>( "clients", ref => ref.where( child, condition, value ) )
                       .valueChanges();
        } else {
            return this.afs.collection<ClientModel>( "clients" ).valueChanges();
        }
    }

    updateClient( client: ClientModel ) {
        this.afs.collection<ClientModel>( "clients" )
            .doc( client.cId )
            .update( client );
    }

    fetchProjects( child?, condition?, value? ) {
        if ( child ) {
            return this.afs
                       .collection<ProjectModel>( "projects", ref => ref.where( child, condition, value ) )
                       .valueChanges();
        } else {
            return this.afs.collection<ProjectModel>( "projects" ).valueChanges();
        }
    }

    async showToast( message, time?, color? ) {
        const toast = await this.tc.create( {
                                                message: message,
                                                duration: time || 2000,
                                                color: color || "primary",
                                                mode: "ios",
                                                position: "bottom"
                                            } );
        await toast.present();
    }
}
