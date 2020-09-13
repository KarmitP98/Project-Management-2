import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../../../services/data.service";
import { Subscription } from "rxjs";
import { MemberModel, ProjectModel, UserModel } from "../../../shared/models";
import { AddMemberComponent } from "../../../components/add-member/add-member.component";
import { ModalController } from "@ionic/angular";
import { MEMBER_TYPE } from "../../../shared/constants";
import { MemberComponent } from "../../../components/member/member.component";
import { pushTrigger } from "../../../shared/animations";
import { WorkLogComponent } from "../../../components/work-log/work-log.component";

@Component( {
                selector: "app-project",
                templateUrl: "./project.page.html",
                styleUrls: [ "./project.page.scss" ],
                animations: [ pushTrigger ]
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

    backToDashboard(): void {
        this.router.navigate( [ "/" + this.user.uId ] );
    }

    removeMember( member: MemberModel ) {
        this.project.pMembers.splice( this.project.pMembers.indexOf( member ), 1 );
        this.available.push( this.users.filter( value => value.uId === member.mUId )[0] );
        this.project.pMemberIds.splice( this.project.pMemberIds.indexOf( member.mUId ), 1 );

        this.ds.updateProjects( this.project );
    }


    async expandView( member: MemberModel ) {
        const inputData = { uId: this.user.uId, memberId: member.mUId, projectId: this.project.pId };
        const modal = await this.mc
                                .create( {
                                             component: MemberComponent,
                                             mode: "ios",
                                             swipeToClose: true,
                                             animated: true,
                                             backdropDismiss: true,
                                             componentProps: { inputData: inputData }
                                         } );
        await modal.present();
    }

    async viewWorkLog( member: MemberModel ) {
        const inputData = { pId: this.project.pId, isHost: this.user.uId === this.project.pHId, mUId: member.mUId };
        const modal = await this.mc
                                .create( {
                                             component: WorkLogComponent,
                                             mode: "ios",
                                             swipeToClose: true,
                                             animated: true,
                                             backdropDismiss: true,
                                             componentProps: { inputData: inputData }
                                         } );
        await modal.present();
    }

}
