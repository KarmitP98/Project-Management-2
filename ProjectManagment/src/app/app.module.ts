import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment.prod";
import { AngularFirestore } from "@angular/fire/firestore";
import { AddClientComponent } from "./components/add-client/add-client.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TopDropDownComponent } from "./components/top-drop-down/top-drop-down.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";

@NgModule( {
               declarations: [ AppComponent,
                               AddClientComponent,
                               TopDropDownComponent ],
               entryComponents: [],
               imports: [ BrowserModule,
                          BrowserAnimationsModule,
                          IonicModule.forRoot(),
                          AppRoutingModule,
                          AngularFireModule.initializeApp( environment.firebaseConfig ),
                          FormsModule,
                          HttpClientModule,
                          MatNativeDateModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule ],
               providers: [
                   StatusBar,
                   SplashScreen,
                   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                   AngularFirestore
               ],
               bootstrap: [ AppComponent ]
           } )
export class AppModule {}
