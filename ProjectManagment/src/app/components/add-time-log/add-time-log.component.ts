import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DailyWorkLog, MemberModel } from "../../shared/models";
import { DataService } from "../../services/data.service";
import { ModalController } from "@ionic/angular";
import { GETWEEKNUMBER } from "../../shared/constants";

@Component( {
                selector: "app-add-time-log",
                templateUrl: "./add-time-log.component.html",
                styleUrls: [ "./add-time-log.component.scss" ]
            } )
export class AddTimeLogComponent implements OnInit, OnDestroy {

    @Input() member: MemberModel;
    lDate: Date;
    lHours: number;
    lWork: string;

    constructor( private ds: DataService,
                 private mc: ModalController ) { }

    ngOnInit() {
        console.log( this.member );


    }

    ngOnDestroy(): void {}

    dismiss( save: boolean ) {
        if ( save ) {
            const dailyWorkLog: DailyWorkLog = {
                date: this.lDate,
                dailyHours: this.lHours,
                dailyBilledHours: 0,
                work: this.lWork,
                billed: false
            };
            const weekNum = GETWEEKNUMBER( new Date( this.lDate ) );
            let added: boolean = false;             // Check whether week exists or not

            if ( this.member.mWeekLog ) {
                for ( let week of this.member.mWeekLog ) {
                    if ( week.weekNumber === weekNum ) {
                        week.dailyLog.push( dailyWorkLog );
                        week.weeklyUnBilledHours += this.lHours;
                        added = true;
                        console.log( "Added" );
                    }
                }
                if ( !added ) {
                    this.member.mWeekLog.push( {
                                                   dailyLog: [ dailyWorkLog ],
                                                   weekNumber: weekNum,
                                                   approved: false,
                                                   billed: false,
                                                   mId: this.member.mId,
                                                   weeklyBilledHours: 0,
                                                   weeklyUnBilledHours: this.lHours
                                               } );
                    console.log( "Not Added :: Added" );
                }
            }

            if ( !this.member.mWeekLog ) {
                this.member.mWeekLog = [ {
                    dailyLog: [ dailyWorkLog ],
                    weekNumber: weekNum,
                    approved: false,
                    billed: false,
                    mId: this.member.mId,
                    weeklyBilledHours: 0,
                    weeklyUnBilledHours: this.lHours
                } ];
                console.log( "Work Log has been added!" );
            }
            // this.mc.dismiss( { member: this.member } );
        } else {
            this.mc.dismiss();
        }
    }
}
