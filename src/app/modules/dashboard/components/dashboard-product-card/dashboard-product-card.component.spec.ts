import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductCardComponent } from './dashboard-product-card.component';

describe('DashboardProductCardComponent', () => {
  let component: DashboardProductCardComponent;
  let fixture: ComponentFixture<DashboardProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProductCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
