import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component( {
                selector: "app-work-log",
                templateUrl: "./work-log.component.html",
                styleUrls: [ "./work-log.component.scss" ]
            } )
export class WorkLogComponent implements OnInit {

    @ViewChild( "logForm", { static: false } ) logForm: NgForm;

    wDate: Date;
    wHours: number;
    wWork: string;

    constructor() { }

    ngOnInit() {}

    logWork(): void {

    }
}
