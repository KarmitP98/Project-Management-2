import { Component, Input, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { PopoverController } from "@ionic/angular";

@Component( {
                selector: "app-top-drop-down",
                templateUrl: "./top-drop-down.component.html",
                styleUrls: [ "./top-drop-down.component.scss" ]
            } )
export class TopDropDownComponent implements OnInit {

    @Input() uId: "";

    constructor( private ds: DataService,
                 private pc: PopoverController ) { }

    ngOnInit() {
    }

    dismiss( logout: boolean ): void {
        this.pc.dismiss();
        if ( logout ) {
            this.ds.logOut();
        }
    }
}
