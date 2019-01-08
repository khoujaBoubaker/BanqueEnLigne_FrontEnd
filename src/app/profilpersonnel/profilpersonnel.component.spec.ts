import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilpersonnelComponent } from './profilpersonnel.component';

describe('ProfilpersonnelComponent', () => {
  let component: ProfilpersonnelComponent;
  let fixture: ComponentFixture<ProfilpersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilpersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilpersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
