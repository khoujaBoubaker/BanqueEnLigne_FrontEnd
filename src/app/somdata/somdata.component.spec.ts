import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomdataComponent } from './somdata.component';

describe('SomdataComponent', () => {
  let component: SomdataComponent;
  let fixture: ComponentFixture<SomdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
