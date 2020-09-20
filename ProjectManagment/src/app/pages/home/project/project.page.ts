import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../../../services/data.service";
import { Subscription } from "rxjs";
import { MemberModel, ProjectModel, UserModel } from "../../../shared/models";
import { AddMemberComponent } from "../../../components/add-member/add-member.component";
import { ModalController, PopoverController } from "@ionic/angular";
import { BILLING_TYPE, MEMBER_TYPE } from "../../../shared/constants";
import { MemberComponent } from "../../../components/member/member.component";
import { pushTrigger } from "../../../shared/animations";
import { WorkLogComponent } from "../../../components/work-log/work-log.component";
import { InvoiceComponent } from "../../../components/invoice/invoice.component";
import { ProjectReportComponent } from "../../../components/project-report/project-report.component";

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
    BT = BILLING_TYPE;

    isUserHost: boolean = false;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 public ds: DataService,
                 private mc: ModalController,
                 private pc: PopoverController ) { }

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
            this.ds.updateProject( this.project );
        }
    }

    backToDashboard(): void {
        this.router.navigate( [ "/" + this.user.uId ] );
    }

    removeMember( member: MemberModel ) {
        this.project.pMembers.splice( this.project.pMembers.indexOf( member ), 1 );
        this.available.push( this.users.filter( value => value.uId === member.mUId )[0] );
        this.project.pMemberIds.splice( this.project.pMemberIds.indexOf( member.mUId ), 1 );

        this.ds.updateProject( this.project );
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
                                             mode: "md",
                                             swipeToClose: true,
                                             animated: true,
                                             backdropDismiss: true,
                                             componentProps: { inputData: inputData }
                                         } );
        await modal.present();
    }

    async viewInvoices( member: MemberModel ) {
        const popover = await this.mc.create( {
                                                  component: InvoiceComponent,
                                                  swipeToClose: false,
                                                  mode: "md",
                                                  componentProps: {
                                                      inputData: {
                                                          uId: this.user.uId,
                                                          pId: this.project.pId,
                                                          mUId: member.mUId
                                                      }
                                                  }
                                              } );
        await popover.present();
    }

    // async raiseInvoice( member: MemberModel ) {
    //     const popover = await this.pc.create( {
    //                                               component: RaiseInvoiceComponent,
    //                                               translucent: false,
    //                                               componentProps: { member: member }
    //                                           } );
    //     await popover.present();
    //
    //     const { data } = await popover.onWillDismiss();
    //
    //     // Check whether data was saved or not
    //     if ( data !== undefined ) {
    //         // Check for Billing Type of the Member
    //         if ( member.mBillingType === this.BT.one_time ) {
    //             // Pay the member
    //             member.mEarned += data.amount;
    //             // Cut the amount paid from the host
    //             if ( member.mUId !== this.project.pHId ) {
    //                 this.project.pMembers.filter( value => value.mUId === this.project.pHId )[0].mPaid += data.amount;
    //             }
    //
    //             // Clear ALL Unbilled Hours
    //             member.mWeekLog.filter( value => value.weeklyUnBilledHours > 0 ).forEach( value => {
    //                 value.weeklyBilledHours += value.weeklyUnBilledHours;
    //                 value.weeklyUnBilledHours = 0;
    //             } );
    //             // Push this to invoices
    //             member.mInvoices.push( { iId: member.mId + "-" + member.mInvoices.length, iAmount: data.amount } );
    //         } else {
    //             let hoursRem = data.hours;
    //             let amount = data.hours * member.mRate;
    //             // Pay the member
    //             member.mEarned += amount;
    //             // Cut the amount paid from the host
    //             if ( member.mUId !== this.project.pHId ) {
    //                 this.project.pMembers.filter( value => value.mUId === this.project.pHId )[0].mPaid += amount;
    //             }
    //
    //             // Clear ALL Unbilled Hours
    //             member.mWeekLog.filter( value => value.weeklyUnBilledHours > 0 ).forEach( value => {
    //                 if ( hoursRem >= value.weeklyUnBilledHours ) {
    //                     value.weeklyBilledHours += value.weeklyUnBilledHours;
    //                     hoursRem -= value.weeklyUnBilledHours;
    //                     value.weeklyUnBilledHours = 0;
    //                 } else {
    //                     value.weeklyBilledHours += hoursRem;
    //                     value.weeklyUnBilledHours -= hoursRem;
    //                     hoursRem = 0;
    //                 }
    //
    //                 if ( hoursRem <= 0 ) {
    //                     return;
    //                 }
    //             } );
    //             // Push this to invoices
    //             member.mInvoices.push(
    //                 { iId: member.mId + "-" + member.mInvoices.length, iAmount: amount, iHours: data.hours } );
    //         }
    //     }
    //     this.ds.updateProject( this.project );
    //
    // }

    getTotalHoursWorked( member: MemberModel ): number {
        let hours = 0;

        member.mWeekLog.forEach( value => {
            hours += value.weeklyUnBilledHours + value.weeklyBilledHours;
        } );

        return hours;
    }

    getUnbilledHours( member: MemberModel ): number {
        let ubh = 0;

        member.mWeekLog.forEach( value => ubh += value.weeklyUnBilledHours );

        return ubh;
    }

    async viewReport() {
        const modal = await this.mc.create( {
                                                component: ProjectReportComponent,
                                                componentProps: { project: this.project },
                                                mode: "md",
                                                swipeToClose: false,
                                                animated: true
                                            } );

        await modal.present();
    }
}
