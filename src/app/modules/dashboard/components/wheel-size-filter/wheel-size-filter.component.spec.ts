import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelSizeFilterComponent } from './wheel-size-filter.component';

describe('WheelSizeFilterComponent', () => {
  let component: WheelSizeFilterComponent;
  let fixture: ComponentFixture<WheelSizeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheelSizeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelSizeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
