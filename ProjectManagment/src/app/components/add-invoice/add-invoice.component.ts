import { Component, Input, OnInit } from "@angular/core";
import { MemberModel } from "../../shared/models";
import { ModalController } from "@ionic/angular";
import { BILLING_TYPE } from "../../shared/constants";

@Component( {
                selector: "app-add-invoice",
                templateUrl: "./add-invoice.component.html",
                styleUrls: [ "./add-invoice.component.scss" ]
            } )
export class AddInvoiceComponent implements OnInit {

    @Input() member: MemberModel;
    unbilledHours: number = 0;
    unbilledPayment: number = 0;
    manHours: number;

    constructor( private mc: ModalController ) { }

    ngOnInit() {
        for ( const week of this.member.mWeekLog ) {
            this.unbilledHours += week.weeklyUnBilledHours;
        }
        if ( this.member.mBillingType === BILLING_TYPE.hourly ) {
            this.unbilledPayment = this.unbilledHours * this.member.mRate;
        } else {
            this.unbilledPayment = this.member.mRate;
        }
    }

    dismiss( add: boolean ): void {
        if ( add ) {
            console.log( this.unbilledHours );
            console.log( this.unbilledPayment );
        } else {
            this.mc.dismiss();
        }
    }
}
