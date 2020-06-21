import { Component, OnInit } from "@angular/core";
import { TopDropDownComponent } from "../../../components/top-drop-down/top-drop-down.component";
import { PopoverController } from "@ionic/angular";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute } from "@angular/router";
import { UserModel } from "../../../shared/models";

@Component( {
                selector: "app-settings",
                templateUrl: "./settings.page.html",
                styleUrls: [ "./settings.page.scss" ]
            } )
export class SettingsPage implements OnInit {

    user: UserModel;

    constructor( private pc: PopoverController,
                 public ds: DataService,
                 private route: ActivatedRoute ) { }

    ngOnInit() {

        const uId = this.route.snapshot.params["uId"];

        let sub = this.ds.fetchUsers( "uId", "==", uId )
                      .subscribe( users => {
                          if ( users ) {
                              this.user = users[0];
                          }
                          sub.unsubscribe();
                      } );
    }

    async openDropDown( $event: MouseEvent ) {
        const pop = await this.pc.create( {
                                              component: TopDropDownComponent,
                                              event: $event,
                                              backdropDismiss: true,
                                              translucent: true,
                                              animated: true,
                                              componentProps: { uId: this.user.uId }
                                          } );
        await pop.present();
    }
}
