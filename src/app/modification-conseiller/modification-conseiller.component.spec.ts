import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationConseillerComponent } from './modification-conseiller.component';

describe('ModificationConseillerComponent', () => {
  let component: ModificationConseillerComponent;
  let fixture: ComponentFixture<ModificationConseillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationConseillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationConseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
