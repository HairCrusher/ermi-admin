import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttrModalComponent } from './product-attr-modal.component';

describe('ProductAttrModalComponent', () => {
  let component: ProductAttrModalComponent;
  let fixture: ComponentFixture<ProductAttrModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAttrModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
