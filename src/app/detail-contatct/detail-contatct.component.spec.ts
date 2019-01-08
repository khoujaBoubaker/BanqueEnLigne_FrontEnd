import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailContatctComponent } from './detail-contatct.component';

describe('DetailContatctComponent', () => {
  let component: DetailContatctComponent;
  let fixture: ComponentFixture<DetailContatctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailContatctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailContatctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
