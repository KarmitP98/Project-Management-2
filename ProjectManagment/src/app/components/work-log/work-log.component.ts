import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DailyWorkLog, MemberModel, ProjectModel, WeeklyWorkLog } from "../../shared/models";
import { DataService } from "../../services/data.service";
import { ModalController } from "@ionic/angular";
import { pushTrigger } from "../../shared/animations";
import { GETWEEKNUMBER } from "../../shared/constants";
import { NgForm } from "@angular/forms";
import { EditWorkLogComponent } from "./edit-work-log/edit-work-log.component";
import { Subscription } from "rxjs";

@Component( {
                selector: "app-work-log",
                templateUrl: "./work-log.component.html",
                styleUrls: [ "./work-log.component.scss" ],
                animations: [ pushTrigger ]
            } )
export class WorkLogComponent implements OnInit, OnDestroy {

    @Input( "inputData" ) inputData: { pId: string, mUId: string, isHost: boolean };
    @ViewChild( "logForm", { static: false } ) logForm: NgForm;

    member: MemberModel;
    project: ProjectModel;

    pSub: Subscription;

    constructor( private ds: DataService,
                 private mc: ModalController ) { }

    ngOnInit() {
        this.pSub = this.ds.fetchProjects( "pId", "==", this.inputData.pId )
                        .subscribe( value => {
                            if ( value ) {
                                this.project = value[0];
                                this.member = this.project.pMembers.filter( value1 => value1.mUId === this.inputData.mUId )[0];
                            }
                        } );
    }

    ngOnDestroy(): void {
        this.pSub.unsubscribe();
    }

    async viewWorkLog( weeklog: any ) {
        const modal = await this.mc
                                .create( {
                                             component: EditWorkLogComponent,
                                             mode: "md",
                                             swipeToClose: false,
                                             componentProps: { worklog: weeklog }
                                         } );

        await modal.present();

        this.member.mWeekLog.forEach( worklog => {
            if ( this.getTotalHoursWorked( worklog ) === 0 ) {
                this.deleteWorkLog( worklog );
            }
        } );
    }

    deleteWorkLog( worklog: WeeklyWorkLog ) {
        this.member.mWeekLog.splice( this.member.mWeekLog.indexOf( worklog ), 1 );
    }

    getTotalHoursWorked( week: WeeklyWorkLog ): number {
        return week.weeklyUnBilledHours + week.weeklyBilledHours;
    }

    getUnbilledHours( week: WeeklyWorkLog ): number {
        return week.weeklyUnBilledHours;
    }

    logWork(): void {

        //Store values in a variable
        const values = this.logForm.value;

        // Create a temp Daily worklog
        const tempLog: DailyWorkLog = { date: values.wDate, dailyHours: values.wHours, work: values.wWork };

        //Get Week Number
        const weekNum = GETWEEKNUMBER( values.wDate );

        let weekFound = false;
        let dayFound = false;

        console.log( values.wDate );

        //Check if weekly work log with that week number = weekNum exists
        this.member.mWeekLog.forEach( week => {
            if ( week.weekNumber === weekNum ) {
                //Check if this week already has a daily log with date = wDate
                week.dailyLog.forEach( day => {
                    if ( day.date.toDate().getTime() === values.wDate.getTime() ) {
                        day.work = values.wWork;
                        week.weeklyUnBilledHours += values.wHours;
                        day.dailyHours += values.wHours;
                        dayFound = true;
                    }
                } );
                // Check if day not found
                if ( !dayFound ) {
                    week.dailyLog.push( tempLog );
                    week.weeklyUnBilledHours += values.wHours;
                }

                weekFound = true;
            }
        } );

        // Week not found
        if ( !weekFound ) {
            const tempWeekLog: WeeklyWorkLog = {
                dailyLog: [ tempLog ],
                weekNumber: weekNum,
                approved: false,
                billed: false,
                mId: this.member.mUId,
                weeklyBilledHours: 0,
                weeklyUnBilledHours: values.wHours
            };
            this.member.mWeekLog.push( tempWeekLog );
        }

        this.ds.updateProject( this.project );
        this.logForm.resetForm();

    }

    close(): void {
        this.ds.updateProject( this.project );
        this.mc.dismiss();
    }
}
