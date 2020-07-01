import { Component, Input, OnInit } from "@angular/core";
import { MemberModel } from "../../shared/models";
import { ModalController } from "@ionic/angular";

@Component( {
                selector: "app-view-invoice",
                templateUrl: "./view-invoice.component.html",
                styleUrls: [ "./view-invoice.component.scss" ]
            } )
export class ViewInvoiceComponent implements OnInit {

    @Input() member: MemberModel;

    constructor( public mc: ModalController ) { }

    ngOnInit() {}

    dismiss(): void {
        this.mc.dismiss( { member: this.member } );
    }

    raiseInvoice(): void {

    }
}
