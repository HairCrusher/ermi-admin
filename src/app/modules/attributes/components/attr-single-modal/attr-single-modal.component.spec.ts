import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttrSingleModalComponent } from './attr-single-modal.component';

describe('AttrCreateModalComponent', () => {
  let component: AttrSingleModalComponent;
  let fixture: ComponentFixture<AttrSingleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttrSingleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttrSingleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
