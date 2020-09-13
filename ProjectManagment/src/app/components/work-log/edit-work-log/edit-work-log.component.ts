import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { DailyWorkLog, WeeklyWorkLog } from "../../../shared/models";
import { pushTrigger } from "../../../shared/animations";

@Component( {
                selector: "app-edit-work-log",
                templateUrl: "./edit-work-log.component.html",
                styleUrls: [ "./edit-work-log.component.scss" ],
                animations: [ pushTrigger ]
            } )
export class EditWorkLogComponent implements OnInit {

    @Input( "workLog" ) worklog: WeeklyWorkLog;

    constructor( private mc: ModalController ) { }

    ngOnInit() {
    }


    dismiss( save: boolean ) {
        if ( save ) {
            let sum = 0;

            this.worklog.dailyLog.forEach( value => {
                sum += value.dailyHours;
            } );
            this.worklog.weeklyUnBilledHours = sum;
            this.mc.dismiss( this.worklog );
        }
        this.mc.dismiss();
    }

    deleteLog( log: DailyWorkLog ): void {

        this.worklog.weeklyUnBilledHours -= log.dailyHours;

        this.worklog.dailyLog.splice( this.worklog.dailyLog.indexOf( log ), 1 );
    }
}
