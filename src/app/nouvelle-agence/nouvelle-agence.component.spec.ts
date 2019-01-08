import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleAgenceComponent } from './nouvelle-agence.component';

describe('NouvelleAgenceComponent', () => {
  let component: NouvelleAgenceComponent;
  let fixture: ComponentFixture<NouvelleAgenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouvelleAgenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
