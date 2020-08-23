import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { DataService } from "../../services/data.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { ClientModel, MemberModel, ProjectModel, UserModel } from "../../shared/models";
import { Subscription } from "rxjs";
import { AddClientComponent } from "../add-client/add-client.component";
import { pushTrigger } from "../../shared/animations";
import { BILLING_TYPE, MEMBER_ROLE, MEMBER_TYPE, PROJECT_STATUS } from "../../shared/constants";
import { NgForm } from "@angular/forms";

@Component( {
                selector: "app-add-project",
                templateUrl: "./add-project.component.html",
                styleUrls: [ "./add-project.component.scss" ],
                animations: [ pushTrigger ]
            } )
export class AddProjectComponent implements OnInit, OnDestroy {

    @Input() uId: string;
    members: UserModel[] = [];
    clients: ClientModel[] = [];
    pName: string;
    pDesc: string;
    pStartDate: Date;
    pDeadline: Date;
    pMembers: MemberModel[] = [];
    pBillingType: string;
    pBudget: number;
    pStatus: string = "active";
    pMemberIds: string[] = [];
    pHUId: string;

    pClient: ClientModel;
    available: UserModel[] = [];

    userSub: Subscription;
    clientSub: Subscription;

    BT = BILLING_TYPE;
    MT = MEMBER_TYPE;
    MR = MEMBER_ROLE;

    @ViewChild( "slide" ) slides: IonSlides;

    @ViewChild( "pForm", { static: false } ) pForm: NgForm;
    @ViewChild( "hForm", { static: false } ) hForm: NgForm;

    customPopoverOptions: any = {
        header: "List of Clients"
    };

    constructor( private mc: ModalController,
                 private ds: DataService,
                 private afs: AngularFirestore ) { }

    ngOnInit() {
        this.userSub = this.ds.fetchUsers()
            // .pipe( take( 1 ) )
                           .subscribe( users => {
                               if ( users ) {
                                   this.members = users;
                                   this.available = users.filter( user => user.uId !== this.uId );
                                   const user = users.filter( user => user.uId === this.uId )[0];

                                   this.pMemberIds = [ this.uId ];
                                   this.pMembers = [ {
                                       mUId: this.uId,
                                       mRequests: [],
                                       mWeekLog: [],
                                       mId: "temp",
                                       mName: user.uName,
                                       mBillingType: this.BT.hourly,
                                       mRate: 10,
                                       mRole: this.MR.developer,
                                       mType: this.MT.host,
                                       mEarned: 0,
                                       mPaid: 0,
                                       mInvoices: []
                                   } ];
                               }
                           } );

        this.clientSub = this.ds.fetchClients()
                             .subscribe( clients => {
                                 if ( clients ) {
                                     this.clients = clients;
                                 }
                             } );

    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        this.clientSub.unsubscribe();
    }

    dismiss( add: boolean ) {
        if ( add ) {
            const project: ProjectModel = {
                pId: "temp",
                pName: this.pName,
                pDesc: this.pDesc,
                cId: this.pClient.cId,
                pStatus: PROJECT_STATUS.active,
                pBillingType: this.pBillingType,
                pBudget: this.pBudget,
                pStartDate: this.pStartDate,
                pDeadline: this.pDeadline,
                pMembers: this.pMembers,
                pMemberIds: this.pMemberIds,
                pHId: this.pMemberIds[0]
            };
            console.log( project );
            project.pId = this.afs.createId();
            this.pClient.pIds.push( project.pId );
            this.ds.addNewProject( project );
            this.ds.updateClient( this.pClient );
        }
        this.mc.dismiss();
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

    addMember() {

        const tempMember: MemberModel = {
            mUId: "",
            mRequests: [],
            mWeekLog: [],
            mId: "temp",
            mName: "",
            mBillingType: this.BT.hourly,
            mRate: 10,
            mRole: this.MR.developer,
            mType: this.MT.member,
            mEarned: 0,
            mPaid: 0,
            mInvoices: []
        };

        this.pMembers.push( tempMember );

    }

    selectMember( mUId: string, i: number ) {
        console.log( mUId );
        this.available.splice( this.available.indexOf( this.members.filter( value => value.uId === mUId )[0] ) );

        this.pMemberIds.push( mUId );

        this.pMembers[i].mName = this.members.filter( value => value.uId === mUId )[0].uName;

    }

    removeMember( member: MemberModel ) {
        console.log( member );
        if ( member.mUId.length > 0 ) {
            this.pMembers.splice( this.pMembers.indexOf( member ), 1 );
            this.available.push( this.members.filter( value => value.uId === member.mUId )[0] );
            this.pMemberIds.splice( this.pMemberIds.indexOf( member.mUId ), 1 );
        }
    }
}