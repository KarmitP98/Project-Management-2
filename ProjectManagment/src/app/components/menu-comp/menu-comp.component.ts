import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router";
import { IonMenu } from "@ionic/angular";

@Component( {
                selector: "app-menu-comp",
                templateUrl: "./menu-comp.component.html",
                styleUrls: [ "./menu-comp.component.scss" ]
            } )
export class MenuCompComponent implements OnInit {

    @Input() uId: string;

    @ViewChild( "menu", { static: false } ) menu: IonMenu;

    constructor( public ds: DataService,
                 public router: Router ) { }

    ngOnInit() {}

    navigate( to: string ) {
        this.menu.close( false )
            .then( () => this.router.navigate( [ "/" + this.uId, to ] ) );
    }

    logOut(): void {
        this.ds.logOut();
    }
}
