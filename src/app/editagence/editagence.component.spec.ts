import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditagenceComponent } from './editagence.component';

describe('EditagenceComponent', () => {
  let component: EditagenceComponent;
  let fixture: ComponentFixture<EditagenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditagenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditagenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
