import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ClientModel, ProjectModel, UserModel } from "../shared/models";
import { ToastController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import * as firebase from "firebase";

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


    loginWithEmailandPassword( email, password ) {
        this.loadingSubject.next( true );

        this.afa.signInWithEmailAndPassword( email, password )
            .then( ( value ) => {
                localStorage.setItem( "userData", JSON.stringify( value.user.uid ) );
                this.router.navigate( [ "/" + value.user.uid ] );
                this.loadingSubject.next( false );
            } )
            .catch( ( err ) => {
                this.showToast( err.message, 3000, "danger" );
                this.loadingSubject.next( false );
            } );

    }

    loginWithProvider( provider: string ) {
        var pro: any;
        switch ( provider ) {
            case "google":
                pro = new firebase.auth.GoogleAuthProvider();
                break;
            case "github":
                pro = new firebase.auth.GithubAuthProvider();
                break;
            case "facebook":
                pro = new firebase.auth.FacebookAuthProvider();
                break;
            default:
                pro = new firebase.auth.EmailAuthProvider();
        }

        this.afa.signInWithPopup( pro )
            .then( value => {

                if ( value.additionalUserInfo.isNewUser ) {
                    this.addNewUser(
                        { uId: value.user.uid, uName: value.user.displayName, uEmail: value.user.email, uPassword: "protected" } );
                }

                localStorage.setItem( "userData", JSON.stringify( value.user.uid ) );
                this.router.navigate( [ "/" + value.user.uid ] );
                this.loadingSubject.next( false );

            } )
            .catch( reason => {
                console.log( reason.errorCode );
                console.log( reason.message );
            } );


    }

    signUpWithEmail( user: UserModel ) {
        this.loadingSubject.next( true );
        this.afa.createUserWithEmailAndPassword( user.uEmail, user.uPassword )
            .then( ( value ) => {

                value.user.updateProfile( { displayName: user.uName } );

                user.uId = value.user.uid;
                this.addNewUser( user );
            } )
            .catch( ( err ) => {
                this.showToast( err.message, 3000, "danger" );
                this.loadingSubject.next( false );
            } );
    }

    logOut() {

        this.router.navigate( [ "/login" ] )
            .then( () => {
                localStorage.removeItem( "userData" );
                this.afa.signOut()
                    .then( value => {
                    } )
                    .catch( err => {
                    } );
            } );

        // this.afa.signOut().then( value => {
        //     localStorage.removeItem( "userData" );  // Clear local storage
        //     this.router.navigate( [ "/login" ] ).then( () => console.log( "User has been logged out!" ) );
        // } ).catch();
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
        this.afs.collection<UserModel>( "users" )
            .doc( user.uId )
            .set( user )
            .then( () => {
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
            .update( client )
            .catch( reason => {
                this.showToast( reason.message );
            } );
    }

    addNewProject( project: ProjectModel ) {
        this.afs.collection( "projects" )
            .doc( project.pId )
            .set( JSON.parse( JSON.stringify( project ) ) )
            .catch( reason => {
                this.showToast( reason.message );
            } );
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

    updateProject( project: ProjectModel ) {
        this.afs.collection<ProjectModel>( "projects" )
            .doc( project.pId )
            .update( project );
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
