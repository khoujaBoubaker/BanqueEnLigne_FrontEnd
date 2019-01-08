import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponenetComponent } from './nav-componenet.component';

describe('NavComponenetComponent', () => {
  let component: NavComponenetComponent;
  let fixture: ComponentFixture<NavComponenetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponenetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
