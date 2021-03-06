import { Component, OnDestroy, OnInit } from "@angular/core";
import { ClientModel, ProjectModel } from "../../../shared/models";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute } from "@angular/router";
import { ModalController, PopoverController } from "@ionic/angular";
import { AddClientComponent } from "../../../components/add-client/add-client.component";
import { Subscription } from "rxjs";
import { MenuComponent } from "../../../components/menu/menu.component";

@Component( {
                selector: "app-clients",
                templateUrl: "./clients.page.html",
                styleUrls: [ "./clients.page.scss" ]
            } )
export class ClientsPage implements OnInit, OnDestroy {
    clients: ClientModel[] = [];
    projects: ProjectModel[] = [];
    uId: "";
    clientSub: Subscription;

    constructor( public ds: DataService,
                 public route: ActivatedRoute,
                 private pc: PopoverController,
                 private mc: ModalController ) { }

    ngOnInit() {

        this.uId = this.route.snapshot.params["uId"];

        this.clientSub = this.ds.fetchClients()
                             .subscribe( clients => {
                                 if ( clients ) {
                                     this.clients = clients;
                                 }
                             } );

    }

    ngOnDestroy(): void {
        this.clientSub.unsubscribe();
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

    async openMenu( $event: MouseEvent ) {
        this.ngOnDestroy();
        const pop = await this.pc
                              .create( {
                                           component: MenuComponent,
                                           event: $event,
                                           animated: true,
                                           mode: "md",
                                           keyboardClose: true,
                                           backdropDismiss: true,
                                           componentProps: { uId: this.uId }
                                       } );
        await pop.present();
    }
}
