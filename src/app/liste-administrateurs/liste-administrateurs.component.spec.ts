import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAdministrateursComponent } from './liste-administrateurs.component';

describe('ListeAdministrateursComponent', () => {
  let component: ListeAdministrateursComponent;
  let fixture: ComponentFixture<ListeAdministrateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAdministrateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAdministrateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
