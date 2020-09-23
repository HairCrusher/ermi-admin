import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductFiltersComponent } from './dashboard-product-filters.component';

describe('DashboardProductFiltersComponent', () => {
  let component: DashboardProductFiltersComponent;
  let fixture: ComponentFixture<DashboardProductFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProductFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProductFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
