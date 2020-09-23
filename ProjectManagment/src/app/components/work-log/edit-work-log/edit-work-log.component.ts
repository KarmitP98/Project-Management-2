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

    initialBilledHours: number = 0;

    constructor( private mc: ModalController ) { }

    ngOnInit() {
        this.initialBilledHours = this.worklog.weeklyBilledHours;

        this.worklog.dailyLog.forEach( value => {
            // @ts-ignore
            var a: Date = new Date( value.date );
            console.log( a.toDateString() );
        } );

    }


    dismiss( save: boolean ) {
        if ( this.worklog.weeklyUnBilledHours > 0 ) {
            let sum = 0;

            this.worklog.dailyLog.forEach( value => {
                sum += value.dailyHours;
            } );

            this.worklog.weeklyUnBilledHours = sum - this.initialBilledHours;
        }
        this.mc.dismiss();
    }

    deleteLog( log: DailyWorkLog ): void {

        this.worklog.weeklyUnBilledHours -= log.dailyHours;

        this.worklog.dailyLog.splice( this.worklog.dailyLog.indexOf( log ), 1 );
    }
}
