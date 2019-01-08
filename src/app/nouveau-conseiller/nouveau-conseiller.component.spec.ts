import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauConseillerComponent } from './nouveau-conseiller.component';

describe('NouveauConseillerComponent', () => {
  let component: NouveauConseillerComponent;
  let fixture: ComponentFixture<NouveauConseillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauConseillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauConseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
