import { Component, OnDestroy, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute } from "@angular/router";
import { MenuComponent } from "../../../components/menu/menu.component";

@Component( {
                selector: "app-settings",
                templateUrl: "./settings.page.html",
                styleUrls: [ "./settings.page.scss" ]
            } )
export class SettingsPage implements OnInit, OnDestroy {

    uId: string;

    constructor( private pc: PopoverController,
                 public ds: DataService,
                 private route: ActivatedRoute ) {

    }

    ngOnInit() {
        this.uId = this.route.snapshot.params["uId"];
    }

    ngOnDestroy(): void {
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
