import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { ModalController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { ClientModel } from "../../shared/models";
import { pushTrigger } from "../../shared/animations";

@Component( {
                selector: "app-add-client",
                templateUrl: "./add-client.component.html",
                styleUrls: [ "./add-client.component.scss" ],
                animations: [ pushTrigger ]
            } )
export class AddClientComponent implements OnInit, OnDestroy {

    cName: string;
    cCountry: string = "India";
    cCompany: string = "Default";
    cEmail: string;
    countries: string[];

    constructor( private ds: DataService,
                 private mc: ModalController,
                 private http: HttpClient ) { }

    ngOnInit() {
        const sub = this.http.get( "/assets/Country-List.txt", { responseType: "text" } )
                        .subscribe( value => {
                            this.countries = value.split( "\n" );
                            sub.unsubscribe();
                        } );
    }

    ngOnDestroy(): void {}

    dismiss( add: boolean ): void {
        if ( add ) {
            const client: ClientModel = {
                cId: "temp",
                cName: this.cName,
                cCountry: this.cCountry,
                cCompany: this.cCompany,
                cEmail: this.cEmail,
                pIds: []
            };
            this.ds.addNewClient( client );
        }
        this.cName = null;
        this.cCompany = null;
        this.cCountry = null;
        this.cEmail = null;
        this.mc.dismiss();
    }
}
