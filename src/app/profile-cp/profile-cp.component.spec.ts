import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCpComponent } from './profile-cp.component';

describe('ProfileCpComponent', () => {
  let component: ProfileCpComponent;
  let fixture: ComponentFixture<ProfileCpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
