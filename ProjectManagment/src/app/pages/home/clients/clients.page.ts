import { Component, OnDestroy, OnInit } from "@angular/core";
import { ClientModel } from "../../../shared/models";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute } from "@angular/router";

@Component( {
                selector: "app-clients",
                templateUrl: "./clients.page.html",
                styleUrls: [ "./clients.page.scss" ]
            } )
export class ClientsPage implements OnInit, OnDestroy {
    clients: ClientModel[];

    constructor( public ds: DataService,
                 public route: ActivatedRoute ) { }

    ngOnInit() {
        this.ds.fetchClients()
            .subscribe( clients => {
                if ( clients ) {
                    this.clients = clients;
                }
            } );
    }

    ngOnDestroy(): void {
    }

}
