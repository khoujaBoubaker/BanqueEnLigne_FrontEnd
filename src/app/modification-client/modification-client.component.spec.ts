import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationClientComponent } from './modification-client.component';

describe('ModificationClientComponent', () => {
  let component: ModificationClientComponent;
  let fixture: ComponentFixture<ModificationClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
