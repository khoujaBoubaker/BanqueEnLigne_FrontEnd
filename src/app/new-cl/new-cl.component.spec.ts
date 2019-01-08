import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClComponent } from './new-cl.component';

describe('NewClComponent', () => {
  let component: NewClComponent;
  let fixture: ComponentFixture<NewClComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
