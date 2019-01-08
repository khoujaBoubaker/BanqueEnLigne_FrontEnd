import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileConseillerComponent } from './profile-conseiller.component';

describe('ProfileConseillerComponent', () => {
  let component: ProfileConseillerComponent;
  let fixture: ComponentFixture<ProfileConseillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileConseillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileConseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
