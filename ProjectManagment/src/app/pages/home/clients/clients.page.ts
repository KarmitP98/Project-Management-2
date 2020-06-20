import { Component, OnDestroy, OnInit } from "@angular/core";
import { ClientModel } from "../../../shared/models";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute } from "@angular/router";
import { TopDropDownComponent } from "../../../components/top-drop-down/top-drop-down.component";
import { ModalController, PopoverController } from "@ionic/angular";
import { AddClientComponent } from "../../../components/add-client/add-client.component";

@Component( {
                selector: "app-clients",
                templateUrl: "./clients.page.html",
                styleUrls: [ "./clients.page.scss" ]
            } )
export class ClientsPage implements OnInit, OnDestroy {
    clients: ClientModel[];
    uId: "";

    constructor( public ds: DataService,
                 public route: ActivatedRoute,
                 private pc: PopoverController,
                 private mc: ModalController ) { }

    ngOnInit() {

        this.uId = this.route.snapshot.params["uId"];

        this.ds.fetchClients()
            .subscribe( clients => {
                if ( clients ) {
                    this.clients = clients;
                }
            } );
    }

    ngOnDestroy(): void {
    }

    async openDropDown( $event: MouseEvent ) {
        const pop = await this.pc.create( {
                                              component: TopDropDownComponent,
                                              event: $event,
                                              backdropDismiss: true,
                                              translucent: true,
                                              animated: true,
                                              componentProps: { uId: this.uId }
                                          } );
        await pop.present();
    }

    async addNewClient() {
        const modal = await this.mc
                                .create( {
                                             component: AddClientComponent,
                                             mode: "ios",
                                             swipeToClose: true,
                                             animated: true,
                                             backdropDismiss: true
                                         } );
        await modal.present();
    }
}
