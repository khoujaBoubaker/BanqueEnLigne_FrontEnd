import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauCreditComponent } from './nouveau-credit.component';

describe('NouveauCreditComponent', () => {
  let component: NouveauCreditComponent;
  let fixture: ComponentFixture<NouveauCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
