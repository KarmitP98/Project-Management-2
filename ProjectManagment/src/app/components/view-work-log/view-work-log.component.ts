import { Component, Input, OnInit } from "@angular/core";
import { MemberModel, WeeklyWorkLog } from "../../shared/models";
import { DataService } from "../../services/data.service";
import { AlertController, ModalController } from "@ionic/angular";
import { GETDATERANGEOFWEEK, GETWEEKNUMBER } from "../../shared/constants";

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
                 private ac: AlertController ) { }

    ngOnInit() {

        this.weeklyLogs = this.member.mWeekLog;
        console.log( GETWEEKNUMBER( new Date() ) );
    }

    dismiss( save: boolean ) {

        this.mc.dismiss( { member: this.member } );
    }

    async addWorkLog() {

        const alert = await this.ac
                                .create( {
                                             header: "Add Work Log",
                                             mode: "md",
                                             backdropDismiss: true,
                                             animated: true,

                                             inputs: [
                                                 {
                                                     name: "date",
                                                     type: "date",
                                                     placeholder: "Pick a Date",
                                                     id: "date",
                                                     label: "Date : ",
                                                     cssClass: "ion-item-border",
                                                     attributes: {
                                                         required: true
                                                     }
                                                 },
                                                 {
                                                     name: "work",
                                                     type: "text",
                                                     id: "work",
                                                     placeholder: "Work",
                                                     label: "Work : ",
                                                     cssClass: "ion-item-border",
                                                     attributes: {
                                                         required: true
                                                     }
                                                 },
                                                 {
                                                     name: "hours",
                                                     id: "hours",
                                                     type: "number",
                                                     placeholder: "Hours",
                                                     min: 0,
                                                     label: "Hours : ",
                                                     cssClass: "ion-item-border",
                                                     attributes: {
                                                         required: true
                                                     }
                                                 }
                                             ],
                                             buttons: [
                                                 {
                                                     text: "Cancel",
                                                     role: "cancel",
                                                     handler: () => {
                                                         console.log( "Confirm Cancel" );
                                                     }
                                                 }, {
                                                     text: "Ok",
                                                     handler: () => {
                                                         console.log( "Confirm Ok" );
                                                     }
                                                 }
                                             ]
                                         } );

        await alert.present();

        alert.onWillDismiss().then( value => {

            this.addData( value?.data?.values?.date, value.data.values.work, value.data.values.hours );
        } );
    }

    addData( date: Date, work: string, hours ) {
        if ( date && work && hours ) {
            hours = parseInt( hours );
            console.log( typeof hours );
            const weekNum = GETWEEKNUMBER( new Date( date ) );
            console.log( weekNum );
            let weekFound = false;

            this.member.mWeekLog.forEach( weekLog => {
                weekLog.weekNumber === weekNum ? weekFound = true : "";
            } );

            let dayfound = false;
            if ( weekFound ) {
                this.member.mWeekLog.forEach( weekLog => {
                    if ( weekLog.weekNumber === weekNum && !weekLog.approved ) {
                        weekLog.dailyLog.forEach( dailyLog => {
                            if ( dailyLog.date === date ) {
                                weekLog.weeklyUnBilledHours = weekLog.weeklyUnBilledHours + (hours - dailyLog.dailyHours);
                                dailyLog.dailyHours = hours;
                                dailyLog.work = work;
                                dayfound = true;
                            }
                        } );

                        if ( !dayfound ) {
                            weekLog.dailyLog.push( {
                                                       dailyHours: hours, date: date, work: work
                                                   } );
                            weekLog.weeklyUnBilledHours = weekLog.weeklyUnBilledHours + hours;
                            console.log( "New Day" + weekLog.weeklyUnBilledHours );
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
