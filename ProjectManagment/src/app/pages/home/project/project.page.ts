import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../../../services/data.service";
import { Subscription } from "rxjs";
import { MemberModel, ProjectModel, UserModel } from "../../../shared/models";
import { AddMemberComponent } from "../../../components/add-member/add-member.component";
import { ModalController } from "@ionic/angular";
import { MEMBER_TYPE } from "../../../shared/constants";
import { ViewWorkLogComponent } from "../../../components/view-work-log/view-work-log.component";
import { ViewInvoiceComponent } from "../../../components/view-invoice/view-invoice.component";

@Component( {
                selector: "app-project",
                templateUrl: "./project.page.html",
                styleUrls: [ "./project.page.scss" ]
            } )
export class ProjectPage implements OnInit, OnDestroy {

    userSub: Subscription;
    projectSub: Subscription;
    usersSub: Subscription;

    user: UserModel;
    project: ProjectModel;
    users: UserModel[];

    available: UserModel[];

    MT = MEMBER_TYPE;

    isUserHost: boolean = false;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 public ds: DataService,
                 private mc: ModalController ) { }

    ngOnInit() {

        const uId = this.route.snapshot.params["uId"];
        const pId = this.route.snapshot.params["pId"];

        this.userSub = this.ds.fetchUsers()
                           .subscribe( users => {
                               if ( users ) {
                                   this.users = users;
                                   this.available = users;
                                   this.user = users.filter( user => user.uId === uId )[0];
                               }
                           } );

        this.projectSub = this.ds.fetchProjects( "pId", "==", pId )
                              .subscribe( projects => {
                                  if ( projects && this.users?.length > 0 ) {
                                      this.project = projects[0];
                                      this.project.pMemberIds.forEach( mId => {
                                          this.available = this.available.filter( user => user.uId !== mId );
                                      } );
                                      this.project.pMembers.forEach( member => {
                                          if ( member.mUId === uId && member.mType === this.MT.host ) {
                                              this.isUserHost = true;
                                          }
                                      } );
                                  }
                              } );

    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        this.projectSub.unsubscribe();
    }

    async addMember() {
        const modal = await this.mc
                                .create( {
                                             component: AddMemberComponent,
                                             mode: "ios",
                                             swipeToClose: true,
                                             animated: true,
                                             backdropDismiss: true,
                                             componentProps: { available: this.available }
                                         } );
        await modal.present();
        const { data } = await modal.onWillDismiss();
        if ( data?.member ) {
            this.project.pMembers.push( data.member );
            this.available = this.available.filter( value => value.uId !== data.member.mUId );
            this.project.pMemberIds.push( data.member.mUId );
            this.ds.updateProjects( this.project );
        }
    }


    async viewTimeSheet( member: MemberModel ) {
        const modal = await this.mc
                                .create( {
                                             component: ViewWorkLogComponent,
                                             mode: "ios",
                                             swipeToClose: true,
                                             animated: true,
                                             backdropDismiss: true,
                                             componentProps: { member: member }
                                         } );
        await modal.present();
        const { data } = await modal.onWillDismiss();
        const newMember = data?.member;

        if ( newMember ) {
            this.project.pMembers.forEach( member => {
                if ( member.mUId === newMember.mUId ) {
                    member = newMember;
                    console.log( "Member Updated!" );
                }
            } );

            this.ds.updateProjects( this.project );
        }
    }

    backToDashboard(): void {
        this.router.navigate( [ "/" + this.user.uId ] );
    }

    removeMember( member: MemberModel ) {
        this.project.pMembers.splice( this.project.pMembers.indexOf( member ), 1 );
        this.available.push( this.users.filter( value => value.uId === member.mUId )[0] );
        this.project.pMemberIds.splice( this.project.pMemberIds.indexOf( member.mUId ), 1 );

        this.ds.updateProjects( this.project );
    }

    async addInvoice( member: MemberModel ) {
        const modal = await this.mc
                                .create( {
                                             component: ViewInvoiceComponent,
                                             mode: "ios",
                                             swipeToClose: true,
                                             animated: true,
                                             backdropDismiss: true,
                                             componentProps: { member: member }
                                         } );
        await modal.present();
        const { data } = await modal.onWillDismiss();
        console.log( data );
    }

    // async expandView( member: MemberModel ) {
    //     const modal = await this.mc
    //                             .create( {
    //                                          component: MemberViewComponent,
    //                                          mode: "ios",
    //                                          swipeToClose: true,
    //                                          animated: true,
    //                                          backdropDismiss: true,
    //                                          componentProps: { member: member }
    //                                      } );
    //
    //     await modal.present();
    // }

    expandView( member: MemberModel ) {
        this.router.navigate( [ member.mUId ] );
    }
}
