import { Component, Input, OnInit } from "@angular/core";
import { MemberModel, WeeklyWorkLog } from "../../shared/models";
import { DataService } from "../../services/data.service";
import { AlertController, ModalController, PopoverController } from "@ionic/angular";
import { GETDATERANGEOFWEEK, GETWEEKNUMBER } from "../../shared/constants";
import { WorkAdderComponent } from "../work-adder/work-adder.component";

@Component( {
                selector: "app-view-work-log",
                templateUrl: "./view-work-log.component.html",
                styleUrls: [ "./view-work-log.component.scss" ]
            } )
export class ViewWorkLogComponent implements OnInit {

    @Input() member: MemberModel;

    weeklyLogs: WeeklyWorkLog[] = [];
    gdrw = GETDATERANGEOFWEEK;
    displayedColumns = [ "date", "work", "hour" ];

    constructor( private ds: DataService,
                 private mc: ModalController,
                 private ac: AlertController,
                 private pc: PopoverController ) { }

    ngOnInit() {
        this.weeklyLogs = this.member.mWeekLog;
    }

    dismiss( save: boolean ) {
        this.mc.dismiss( { member: this.member } );
    }

    async addWorkLog() {
        const pop = await this.pc.create( {
                                              component: WorkAdderComponent,
                                              backdropDismiss: false,
                                              showBackdrop: true
                                          } );
        await pop.present();

        const { data } = await pop.onDidDismiss();

        if ( data?.wDate && data?.wDesc && data?.wHours ) {
            this.addData( data.wDate, data.wDesc, data.wHours );
        }

    }

    addData( date: Date, work: string, hours: number ) {

        if ( date && work && hours ) {
            const weekNum = GETWEEKNUMBER( new Date( date ) );
            console.log( weekNum );
            let weekFound = false;

            this.member.mWeekLog.forEach( weekLog => {
                weekLog.weekNumber === weekNum ? weekFound = true : "";
            } );

            let dayFound = false;

            if ( weekFound ) {
                this.member.mWeekLog.forEach( weekLog => {
                    if ( weekLog.weekNumber === weekNum && !weekLog.approved ) {
                        weekLog.dailyLog.forEach( dailyLog => {
                            if ( dailyLog.date.getTime() === date.getTime() ) {
                                weekLog.weeklyUnBilledHours = weekLog.weeklyUnBilledHours + (hours - dailyLog.dailyHours);
                                dailyLog.dailyHours = hours;
                                dailyLog.work = work;
                                dayFound = true;
                            }
                        } );

                        if ( !dayFound ) {
                            weekLog.dailyLog.push( {
                                                       dailyHours: hours, date: date, work: work
                                                   } );
                            weekLog.weeklyUnBilledHours = weekLog.weeklyUnBilledHours + hours;
                        }
                    }
                } );
            } else {
                this.member.mWeekLog.push( {
                                               weekNumber: weekNum,
                                               weeklyUnBilledHours: hours,
                                               weeklyBilledHours: 0,
                                               approved: false,
                                               billed: false,
                                               mId: this.member.mUId,
                                               dailyLog: [ { work: work, date: date, dailyHours: hours } ]
                                           } );
            }
        }
    }

}
