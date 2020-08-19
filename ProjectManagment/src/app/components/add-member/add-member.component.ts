import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MemberModel, UserModel } from "../../shared/models";
import { pushTrigger } from "../../shared/animations";
import { MEMBER_TYPE } from "../../shared/constants";

@Component( {
                selector: "app-add-member",
                templateUrl: "./add-member.component.html",
                styleUrls: [ "./add-member.component.scss" ],
                animations: [ pushTrigger ]
            } )
export class AddMemberComponent implements OnInit {

    member: MemberModel;
    @Input() available: UserModel[];

    pUser: UserModel;

    mBillingType: string;
    mRate: number;
    mRole: string;
    mType: string;

    constructor( private mc: ModalController ) { }

    ngOnInit() {
    }

    dismiss( b: boolean ): void {
        if ( b ) {
            const member: MemberModel = {
                mId: "Temp",
                mUId: this.pUser.uId,
                mBillingType: this.mBillingType,
                mName: this.pUser.uName,
                mRate: this.mRate,
                mRole: this.mRole,
                mType: MEMBER_TYPE.member,
                mWeekLog: [],
                mRequests: [],
                mPaid: 0,
                mEarned: 0,
                mInvoices: []
            };
            this.mc.dismiss( { member: member } );
        } else {
            this.mc.dismiss();
        }
    }
}
