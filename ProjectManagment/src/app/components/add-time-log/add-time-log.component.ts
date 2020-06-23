import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MemberModel, WeeklyWorkLog } from "../../shared/models";
import { DataService } from "../../services/data.service";
import { ModalController } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component( {
                selector: "app-add-time-log",
                templateUrl: "./add-time-log.component.html",
                styleUrls: [ "./add-time-log.component.scss" ]
            } )
export class AddTimeLogComponent implements OnInit, OnDestroy {

    @Input() member: MemberModel;
    weeklyLog: WeeklyWorkLog[] = [];
    logSub: Subscription;
    lDate: Date;
    lHours: number;

    constructor( private ds: DataService,
                 private mc: ModalController ) { }

    ngOnInit() {
        console.log( this.member );


    }

    ngOnDestroy(): void {}

    dismiss( save: boolean ) {
        if ( save ) {

        } else {
            this.mc.dismiss();
        }
    }
}
