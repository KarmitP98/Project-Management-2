import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserModel } from "../../../shared/models";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ModalController } from "@ionic/angular";
import { AddClientComponent } from "../../../components/add-client/add-client.component";
import { leftLoadTrigger, opacityLoadTrigger } from "../../../shared/animations";

interface sampleProject {
    pName: string,
    pDesc: string,
    pTotalMembers: number,
    pStartDate: Date,
    pDeadline: Date,
    pStatus: boolean
}

@Component( {
                selector: "app-dashboard",
                templateUrl: "./dashboard.page.html",
                styleUrls: [ "./dashboard.page.scss" ],
                animations: [ leftLoadTrigger, opacityLoadTrigger ]
            } )
export class DashboardPage implements OnInit, OnDestroy {
    user: UserModel;
    userSub: Subscription;
    currentSampleCards: sampleProject[] = [];
    finishedSampleCards: sampleProject[] = [];

    constructor( public ds: DataService,
                 public route: ActivatedRoute,
                 private router: Router,
                 private mc: ModalController ) { }

    ngOnInit() {

        const uId = this.route.snapshot.params["uId"];

        console.log( this.route.snapshot.params );

        this.userSub = this.ds.fetchUsers( "uId", "==", uId )
            // .pipe(untilDestroyed(this))                  UNTIL DESTROYED is not working.
                           .subscribe( users => {
                               if ( users ) {
                                   this.user = users[0];
                               }
                           } );

        this.makeSampleCards();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    async addNewClient() {
        const modal = await this.mc
                                .create( {
                                             component: AddClientComponent,
                                             mode: "ios",
                                             swipeToClose: true,
                                             animated: true,
                                             backdropDismiss: true
                                         } );
        await modal.present();
    }

    private makeSampleCards(): void {

        let i = 1;
        for ( i = 1; i <= 6; i++ ) {
            const status = Math.random() > 0.5;
            if ( status ) {
                this.currentSampleCards
                    .push( {
                               pName: "Project " + i,
                               pStartDate: new Date(),
                               pDesc: "This is the description of Project " + i,
                               pDeadline: new Date(),
                               pTotalMembers: Math.round( Math.random() * 6 + 1 ),
                               pStatus: status
                           } );
            } else {
                this.finishedSampleCards
                    .push( {
                               pName: "Project " + i,
                               pStartDate: new Date(),
                               pDesc: "This is the description of Project " + i,
                               pDeadline: new Date(),
                               pTotalMembers: Math.round( Math.random() * 6 + 1 ),
                               pStatus: status
                           } );
            }
        }
    }


}
