import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { MemberModel } from "../../shared/models";
import { BILLING_TYPE } from "../../shared/constants";
import { NgForm } from "@angular/forms";

@Component( {
                selector: "app-raise-invoice",
                templateUrl: "./raise-invoice.component.html",
                styleUrls: [ "./raise-invoice.component.scss" ]
            } )
export class RaiseInvoiceComponent implements OnInit {

    BT = BILLING_TYPE;
    @Input( "member" ) member: MemberModel;
    amount: number = 0;
    hours: number = 0;
    actualHours: number = 0;

    @ViewChild( "priceForm", { static: false } ) priceForm: NgForm;
    @ViewChild( "hourForm", { static: false } ) hourForm: NgForm;

    constructor( private pc: PopoverController ) { }

    ngOnInit() {
        if ( this.member.mBillingType === this.BT.hourly ) {
            this.member.mWeekLog.filter( value => value.weeklyUnBilledHours > 0 ).forEach(
                value => this.hours += value.weeklyUnBilledHours );
        } else {
            this.amount = this.actualHours = this.member.mRate;
        }
    }

    dismiss( type: number ): void {
        if ( type === 1 ) {
            this.pc.dismiss( { amount: this.amount } );
        } else if ( type === 2 ) {
            this.pc.dismiss( { actualHours: this.actualHours, hours: this.hours } );
        }
        this.pc.dismiss();
    }
}
