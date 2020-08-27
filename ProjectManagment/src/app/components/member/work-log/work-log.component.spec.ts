import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { WorkLogComponent } from "./work-log.component";

describe( "WorkLogComponent", () => {
  let component: WorkLogComponent;
  let fixture: ComponentFixture<WorkLogComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
                                      declarations: [ WorkLogComponent ],
                                      imports: [ IonicModule.forRoot() ]
                                    } ).compileComponents();

    fixture = TestBed.createComponent( WorkLogComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } ) );

  it( "should create", () => {
    expect( component ).toBeTruthy();
  } );
} );
