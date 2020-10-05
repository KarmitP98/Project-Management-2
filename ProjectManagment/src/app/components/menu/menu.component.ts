import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router";

@Component( {
                selector: "app-menu",
                templateUrl: "./menu.component.html",
                styleUrls: [ "./menu.component.scss" ]
            } )
export class MenuComponent implements OnInit {

    @Input( "uId" ) uId: string;

    constructor( private pc: PopoverController,
                 private ds: DataService,
                 private router: Router ) {
    }

    ngOnInit() {
    }

    dismiss(): void {
        this.pc.dismiss();
    }

    navigate( root: string ): void {
        this.router.navigate( [ "/", this.uId, root ] );
        this.pc.dismiss();
    }

    logOut() {
        this.ds.logOut();
        this.dismiss();
    }
}
