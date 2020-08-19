import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component( {
                selector: "app-work-adder",
                templateUrl: "./work-adder.component.html",
                styleUrls: [ "./work-adder.component.scss" ]
            } )
export class WorkAdderComponent implements OnInit {

    wDate: Date;
    wDesc: string;
    wHours: number;

    constructor( private pc: PopoverController ) { }

    ngOnInit() {}

    addWork(): void {
        this.pc.dismiss( { wDate: this.wDate, wDesc: this.wDesc, wHours: this.wHours } );
    }

    cancel(): void {
        this.pc.dismiss();
    }
}
