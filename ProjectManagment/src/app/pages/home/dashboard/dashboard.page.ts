import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProjectModel, UserModel } from "../../../shared/models";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ModalController, PopoverController } from "@ionic/angular";
import { AddClientComponent } from "../../../components/add-client/add-client.component";
import { leftLoadTrigger, opacityLoadTrigger, pushTrigger } from "../../../shared/animations";
import { TopDropDownComponent } from "../../../components/top-drop-down/top-drop-down.component";
import { AddProjectComponent } from "../../../components/add-project/add-project.component";
import { AngularFirestore } from "@angular/fire/firestore";

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
                animations: [ leftLoadTrigger, opacityLoadTrigger, pushTrigger ]
            } )
export class DashboardPage implements OnInit, OnDestroy {

    user: UserModel;

    userSub: Subscription;
    projectSub: Subscription;

    currentSampleCards: sampleProject[] = [];
    finishedSampleCards: sampleProject[] = [];

    sample: boolean = true;

    projects: ProjectModel[] = [];
    currentP: ProjectModel[] = [];
    pastP: ProjectModel[] = [];


    constructor( public ds: DataService,
                 public route: ActivatedRoute,
                 private router: Router,
                 private mc: ModalController,
                 private pc: PopoverController,
                 private afs: AngularFirestore ) { }

    ngOnInit() {

        const uId = this.route.snapshot.params["uId"];


        this.userSub = this.ds.fetchUsers( "uId", "==", uId )
                           .subscribe( users => {
                               if ( users ) {
                                   this.user = users[0];
                               }
                           } );

        // this.makeSampleCards();

        this.projectSub = this.ds.fetchProjects( "pMemberIds", "array-contains", uId )
                              .subscribe( projects => {
                                  if ( projects ) {

                                      this.sample = false;
                                      this.projects = projects;

                                      // this.currentP = [];
                                      // this.pastP = [];
                                      // projects.forEach( project => {
                                      //     if ( project.pStatus === PROJECT_STATUS.active ) {
                                      //         this.currentP.push( project );
                                      //
                                      //     } else {
                                      //         this.pastP.push( project );
                                      //     }
                                      // } );
                                      // this.projects = projects;
                                      // this.sample = false;
                                  }
                              } );
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        this.projectSub.unsubscribe();
    }

    async openDropDown( $event: MouseEvent ) {
        const pop = await this.pc.create( {
                                              component: TopDropDownComponent,
                                              event: $event,
                                              backdropDismiss: true,
                                              translucent: true,
                                              animated: true,
                                              componentProps: { uId: this.user.uId }
                                          } );
        await pop.present();
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

    async addNewProject() {
        const modal = await this.mc
                                .create( {
                                             component: AddProjectComponent,
                                             mode: "ios",
                                             swipeToClose: true,
                                             animated: true,
                                             backdropDismiss: true,
                                             componentProps: { uId: this.user.uId }
                                         } );
        await modal.present();

    }

    moneyEarned( project: ProjectModel ): number {

        let earned = 0, paid = 0;

        project.pMembers.forEach( value => {
            if ( value.mUId === this.user.uId ) {
                earned = value.mEarned;
                paid = value.mPaid;
            }
        } );

        return earned - paid;
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
