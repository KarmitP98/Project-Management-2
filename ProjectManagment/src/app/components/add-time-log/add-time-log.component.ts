import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MemberModel } from "../../shared/models";
import { DataService } from "../../services/data.service";
import { ModalController } from "@ionic/angular";
import { GETDATERANGEOFWEEK, GETWEEKNUMBER } from "../../shared/constants";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component( {
                selector: "app-add-time-log",
                templateUrl: "./add-time-log.component.html",
                styleUrls: [ "./add-time-log.component.scss" ]
            } )
export class AddTimeLogComponent implements OnInit, OnDestroy {

    @Input() member: MemberModel;
    today = new Date();
    weekNum = GETWEEKNUMBER( this.today );
    dateRange = GETDATERANGEOFWEEK( this.weekNum );
    startDate = this.dateRange[0];
    endDate = this.dateRange[6];

    logDate: Date;
    logWork: string;
    logHours: number;

    oldLogHours: number;

    found: boolean = false;

    constructor( private ds: DataService,
                 private mc: ModalController ) { }

    ngOnInit() {

    }

    ngOnDestroy(): void {}

    myFilter = ( d: Date | null ): boolean => {
        const day = (d || new Date());
        return day >= this.startDate && day <= this.endDate;
    };

    dismiss( save: boolean ) {
        if ( save ) {


            if ( this.found ) {
                this.member.mWeekLog.forEach( week => {
                    if ( week.weekNumber === this.weekNum ) {
                        week.dailyLog.forEach( dailyLog => {
                            if ( dailyLog.date.toString().split( "T" )[0] === this.logDate.toString().split( "T" )[0] ) {
                                dailyLog.dailyHours = this.logHours;
                                dailyLog.work = this.logWork;
                                week.weeklyUnBilledHours -= this.oldLogHours;
                                week.weeklyUnBilledHours += this.logHours;
                            }
                        } );
                    }
                } );
            } else {
                let weekFound = false;
                this.member.mWeekLog.forEach( week => {
                    if ( week.weekNumber === this.weekNum ) {
                        week.dailyLog.push(
                            {
                                date: this.logDate,
                                work: this.logWork,
                                dailyHours: this.logHours,
                                billed: false,
                                dailyBilledHours: 0
                            } );
                        week.weeklyUnBilledHours += this.logHours;
                        weekFound = true;
                    }
                } );

                if ( !weekFound ) {
                    this.member.mWeekLog.push( {
                                                   weekNumber: this.weekNum,
                                                   mId: this.member.mId,
                                                   billed: false,
                                                   approved: false,
                                                   weeklyBilledHours: 0,
                                                   weeklyUnBilledHours: this.logHours,
                                                   dailyLog: [ {
                                                       dailyBilledHours: 0,
                                                       billed: false,
                                                       dailyHours: this.logHours,
                                                       work: this.logWork,
                                                       date: this.logDate
                                                   } ]
                                               } );
                }
            }
            this.mc.dismiss( { member: this.member } );
        } else {
            this.mc.dismiss();
        }
    }

    selectDate( $event: MatDatepickerInputEvent<Date> ): void {
        let log;

        this.found = false;
        this.logHours = null;
        this.logWork = null;
        this.oldLogHours = null;

        this.member.mWeekLog.forEach( week => {
            if ( week.weekNumber === this.weekNum ) {
                console.log( "Week Found" );
                week.dailyLog.forEach( dailyLog => {
                    if ( dailyLog.date.toString().split( "T" )[0] === this.logDate.toString().split( "T" )[0] ) {
                        console.log( "Date Found" );
                        this.logHours = dailyLog.dailyHours;
                        this.oldLogHours = dailyLog.dailyHours;
                        this.logWork = dailyLog.work;
                        this.found = true;
                    }
                } );
            }
        } );

    }
}
