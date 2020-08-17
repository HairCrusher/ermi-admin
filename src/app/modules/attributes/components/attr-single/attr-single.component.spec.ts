import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttrSingleComponent } from './attr-single.component';

describe('AttrSingleComponent', () => {
  let component: AttrSingleComponent;
  let fixture: ComponentFixture<AttrSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttrSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttrSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
