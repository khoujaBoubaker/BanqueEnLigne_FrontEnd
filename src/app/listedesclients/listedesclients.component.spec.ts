import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedesclientsComponent } from './listedesclients.component';

describe('ListedesclientsComponent', () => {
  let component: ListedesclientsComponent;
  let fixture: ComponentFixture<ListedesclientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListedesclientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedesclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
