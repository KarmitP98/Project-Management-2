import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { pushTrigger } from "../../shared/animations";
import { DailyWorkLog, InvoiceModel, MemberModel, ProjectModel, WeeklyWorkLog } from "../../shared/models";
import { GETWEEKNUMBER } from "../../shared/constants";
import { NgForm } from "@angular/forms";
import { DataService } from "../../services/data.service";
import { Subscription } from "rxjs";

@Component( {
                selector: "app-member",
                templateUrl: "./member.component.html",
                styleUrls: [ "./member.component.scss" ],
                animations: [ pushTrigger ]
            } )
export class MemberComponent implements OnInit, OnDestroy {

    @Input( "inputData" ) inputData: { uId: string, memberId: string, projectId: string };

    @ViewChild( "slides" ) slides: IonSlides;

    @ViewChild( "logForm" ) logForm: NgForm;

    project: ProjectModel;
    projectSub: Subscription;

    // wDate: Date;
    // wWork: string;
    // wHours: number;

    currentSlide: number = 0;

    member: MemberModel;
    isAdmin: boolean = false;
    isHost: boolean = false;

    invoices: InvoiceModel[] = [];

    constructor( private mc: ModalController,
                 private ds: DataService ) { }

    ngOnInit() {

        this.projectSub = this.ds.fetchProjects( "pId", "==", this.inputData.projectId )
                              .subscribe( value => {
                                  if ( value ) {
                                      this.project = value[0];

                                      this.member = this.project.pMembers.filter( value => value.mUId === this.inputData.memberId )[0];

                                      this.isAdmin = this.member.mUId === this.inputData.uId;

                                      this.isHost = this.project.pHId === this.member.mUId;

                                      this.member.mWeekLog.forEach( value => {
                                          if ( !value.billed ) {
                                              this.invoices.push( {
                                                                      iApproved: false,
                                                                      iWeek: value.weekNumber,
                                                                      iAmount: value.weeklyUnBilledHours * this.member.mRate
                                                                  } );
                                          }

                                      } );

                                      this.invoices.push( ...this.member.mInvoices );

                                  }
                              } );


    }

    ngOnDestroy(): void {
        this.projectSub.unsubscribe();
    }

    close(): void {
        this.mc.dismiss();
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

        //Check if weekly work log with that week number = weekNum exists
        this.member.mWeekLog.forEach( week => {
            if ( week.weekNumber === weekNum ) {
                //Check if this week already has a daily log with date = wDate
                week.dailyLog.forEach( day => {
                    if ( day.date.getDate() === values.wDate.getDate() ) {
                        day.work = values.wWork;
                        week.weeklyUnBilledHours = week.weeklyUnBilledHours + values.wHours - day.dailyHours;
                        day.dailyHours = values.wHours;
                        dayFound = true;
                    }
                } );
                // Check if day not found
                if ( !dayFound ) {
                    week.dailyLog.push( tempLog );
                    week.weeklyUnBilledHours += values.wHours;
                }

                this.invoices.forEach( invoice => {
                    if ( invoice.iWeek === weekNum && !invoice.iApproved ) {
                        invoice.iAmount = week.weeklyUnBilledHours * this.member.mRate;
                    }
                } );

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
            this.invoices.push( { iWeek: weekNum, iApproved: false, iAmount: this.member.mRate * values.wHours } );
        }

        this.logForm.resetForm();

    }

    deleteWorkLog( weeklog: WeeklyWorkLog ): void {
        this.member.mWeekLog.splice( this.member.mWeekLog.indexOf( weeklog ), 1 );
    }

    approveInvoice( invoice: InvoiceModel ): void {
        invoice.iApproved = true;

        this.member.mWeekLog.forEach( value => {
            if ( value.weekNumber === invoice.iWeek ) {
                value.billed = true;
                value.weeklyBilledHours = value.weeklyUnBilledHours;
                value.weeklyUnBilledHours = 0;
            }

        } );

        this.member.mEarned += invoice.iAmount;

        this.project.pMembers.forEach( value => {
            if ( value.mUId === this.project.pHId ) {
                value.mPaid += invoice.iAmount;
            }
        } );

        this.invoices.forEach( value => {
            if ( value.iWeek === invoice.iWeek ) {
                value = invoice;
            }
        } );

        this.member.mInvoices.push( invoice );
    }
}
