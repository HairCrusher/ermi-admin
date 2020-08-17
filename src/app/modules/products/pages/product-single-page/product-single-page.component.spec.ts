import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSinglePageComponent } from './product-single-page.component';

describe('ProductSinglePageComponent', () => {
  let component: ProductSinglePageComponent;
  let fixture: ComponentFixture<ProductSinglePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSinglePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
