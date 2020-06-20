import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MemberModel, UserModel } from "../../shared/models";

@Component( {
                selector: "app-add-member",
                templateUrl: "./add-member.component.html",
                styleUrls: [ "./add-member.component.scss" ]
            } )
export class AddMemberComponent implements OnInit {

    member: MemberModel;
    @Input() available: UserModel[];

    pUser: UserModel;

    mBillingType: string;
    mRate: number = 11.41;
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
                mType: this.mType
            };
            this.mc.dismiss( { member: member } );
        } else {
            this.mc.dismiss();
        }
    }
}
