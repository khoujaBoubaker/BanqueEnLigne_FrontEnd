import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailadminComponent } from './detailadmin.component';

describe('DetailadminComponent', () => {
  let component: DetailadminComponent;
  let fixture: ComponentFixture<DetailadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
