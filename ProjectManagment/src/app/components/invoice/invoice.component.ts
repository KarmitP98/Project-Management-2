import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { MemberModel, ProjectModel } from "../../shared/models";
import { DataService } from "../../services/data.service";
import { Subscription } from "rxjs";
import { RaiseInvoiceComponent } from "./raise-invoice/raise-invoice.component";
import { BILLING_TYPE } from "../../shared/constants";

@Component( {
                selector: "app-invoice",
                templateUrl: "./invoice.component.html",
                styleUrls: [ "./invoice.component.scss" ]
            } )
export class InvoiceComponent implements OnInit, OnDestroy {

    @Input() inputData: { uId: string, mUId: string, pId: string };

    member: MemberModel;
    project: ProjectModel;
    isHost: boolean = false;
    isMember: boolean = false;

    BT = BILLING_TYPE;

    pSub: Subscription;

    constructor( private mc: ModalController,
                 private ds: DataService,
                 private pc: PopoverController ) { }

    ngOnInit() {

        this.pSub = this.ds.fetchProjects( "pId", "==", this.inputData.pId )
                        .subscribe( value => {
                            if ( value ) {
                                this.project = value[0];
                                this.member = this.project.pMembers.filter( mem => mem.mUId === this.inputData.mUId )[0];
                                this.isHost = this.project.pHId === this.inputData.uId;
                                this.isMember = this.member.mUId === this.inputData.uId;
                            }
                        } );
    }

    ngOnDestroy(): void {
        this.pSub.unsubscribe();
    }

    async raiseInvoice( member: MemberModel ) {
        const popover = await this.pc.create( {
                                                  component: RaiseInvoiceComponent,
                                                  translucent: false,
                                                  componentProps: { member: member }
                                              } );
        await popover.present();

        const { data } = await popover.onWillDismiss();

        // Check whether data was saved or not
        if ( data !== undefined ) {
            // Check for Billing Type of the Member
            if ( member.mBillingType === this.BT.one_time ) {
                // Pay the member
                member.mEarned += data.amount;
                let hours: number = 0;
                // Cut the amount paid from the host
                if ( member.mUId !== this.project.pHId ) {
                    this.project.pMembers.filter( value => value.mUId === this.project.pHId )[0].mPaid += data.amount;
                }

                // Clear ALL Unbilled Hours
                member.mWeekLog.filter( value => value.weeklyUnBilledHours > 0 ).forEach( value => {
                    value.weeklyBilledHours += value.weeklyUnBilledHours;
                    hours += value.weeklyUnBilledHours;
                    value.weeklyUnBilledHours = 0;
                } );
                // Push this to invoices
                member.mInvoices.push( { iId: member.mId + "-" + member.mInvoices.length, iAmount: data.amount, iHours: hours } );
            } else {
                let hoursRem = data.hours;
                let amount = data.hours * member.mRate;
                // Pay the member
                member.mEarned += amount;
                // Cut the amount paid from the host
                if ( member.mUId !== this.project.pHId ) {
                    this.project.pMembers.filter( value => value.mUId === this.project.pHId )[0].mPaid += amount;
                }

                // Clear ALL Unbilled Hours
                member.mWeekLog.filter( value => value.weeklyUnBilledHours > 0 ).forEach( value => {
                    if ( hoursRem >= value.weeklyUnBilledHours ) {
                        value.weeklyBilledHours += value.weeklyUnBilledHours;
                        hoursRem -= value.weeklyUnBilledHours;
                        value.weeklyUnBilledHours = 0;
                    } else {
                        value.weeklyBilledHours += hoursRem;
                        value.weeklyUnBilledHours -= hoursRem;
                        hoursRem = 0;
                    }

                    if ( hoursRem <= 0 ) {
                        return;
                    }
                } );
                // Push this to invoices
                member.mInvoices.push(
                    { iId: member.mId + "-" + member.mInvoices.length, iAmount: amount, iHours: data.hours } );
            }
        }
        this.ds.updateProject( this.project );

    }

    getUnbilledHours( member: MemberModel ): number {
        let ubh = 0;
        member.mWeekLog.forEach( value => ubh += value.weeklyUnBilledHours );
        return ubh;
    }

    dismiss(): void {
        this.mc.dismiss();
    }
}
