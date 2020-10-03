import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { DataService } from "../../services/data.service";

@Component( {
                selector: "app-menu",
                templateUrl: "./menu.component.html",
                styleUrls: [ "./menu.component.scss" ]
            } )
export class MenuComponent implements OnInit {

    @Input() uId: string;

    constructor( private pc: PopoverController,
                 private ds: DataService ) { }

    ngOnInit() {}

    dismiss(): void {
        this.ds.logOut();
        this.pc.dismiss();
    }
}
