import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonprofileComponent } from './monprofile.component';

describe('MonprofileComponent', () => {
  let component: MonprofileComponent;
  let fixture: ComponentFixture<MonprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
