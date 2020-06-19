import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { ActivatedRoute } from "@angular/router";

@Component( {
                selector: "app-home",
                templateUrl: "./home.page.html",
                styleUrls: [ "./home.page.scss" ]
            } )
export class HomePage implements OnInit {

    constructor( public route: ActivatedRoute,
                 public ds: DataService ) { }

    ngOnInit() {
        console.log( this.route.snapshot.params );
    }

}
