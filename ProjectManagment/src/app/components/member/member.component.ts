import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { pushTrigger } from "../../shared/animations";

@Component( {
                selector: "app-member",
                templateUrl: "./member.component.html",
                styleUrls: [ "./member.component.scss" ],
                animations: [ pushTrigger ]
            } )
export class MemberComponent implements OnInit {

    @ViewChild( "slides" ) slides: IonSlides;

    constructor( private mc: ModalController ) { }

    ngOnInit() {}

    close(): void {
        this.mc.dismiss();
    }

}
