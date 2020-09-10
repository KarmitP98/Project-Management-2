import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { EditWorkLogComponent } from "./edit-work-log.component";

describe( "EditWorkLogComponent", () => {
  let component: EditWorkLogComponent;
  let fixture: ComponentFixture<EditWorkLogComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
                                      declarations: [ EditWorkLogComponent ],
                                      imports: [ IonicModule.forRoot() ]
                                    } ).compileComponents();

    fixture = TestBed.createComponent( EditWorkLogComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } ) );

  it( "should create", () => {
    expect( component ).toBeTruthy();
  } );
} );
