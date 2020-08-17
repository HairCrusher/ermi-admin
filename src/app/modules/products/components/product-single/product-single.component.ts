import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {AttrValue, Product, ProductVariant} from "@modules/products/types";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, tap} from "rxjs/operators";
import {Store} from "@ngxs/store";
import {AttrSetState} from "@modules/attr-sets/store/attr-set.state";
import {NzSelectOptionInterface} from "ng-zorro-antd";

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSingleComponent implements OnInit {

  @Input() product: Observable<Product>;

  @Output() submitForm = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<number>();

  attrSets = this.store.select(AttrSetState.attrSets)
    .pipe(map(x => x.map<NzSelectOptionInterface>(a => ({label: a.name, value: a.id}))));

  isEdit = false;
  showEditSwitch = true;

  loading$ = new BehaviorSubject<boolean>(true);

  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    if (this.product) {
      this.product
        .pipe(
          filter(x => !!x),
          tap(() => this.loading$.next(false))
        )
        .subscribe(p => {
          this.makeProduct(p);
          this.form.disable();
        });
    } else {
      this.makeEmptyProduct();
      this.showEditSwitch = false;
      this.isEdit = true;
      this.loading$.next(false);
    }
  }

  trackByVariants(i, {id}: ProductVariant) {
    return id;
  }

  trackByAttrVal(i, {id}: AttrValue) {
    return id;
  }

  private makeProduct(
    {
      id,
      name,
      desc,
      variants,
      attr_set_id
    }: Product
  ) {
    this.form = this.fb.group({
      id,
      name: [name, Validators.required],
      desc,
      attr_set_id,
      variants: this.fb.array(variants.map(v => this.makePVariant(v)))
    });
  }

  private makePVariant(
    {
      id,
      attrs,
      price,
      weight,
      is_discount,
      is_available,
      in_stock_qty,
      discount_price,
      desc,
    }: ProductVariant
  ) {
    return this.fb.group({
      id,
      price: [price, Validators.required],
      desc,
      weight,
      is_discount,
      is_available,
      in_stock_qty,
      discount_price,
      attrs: this.fb.array(attrs.map(a => this.makePAttrValue(a)))
    })
  }

  private makePAttrValue(
    {
      id,
      value,
      attr_id,
      attribute
    }: AttrValue
  ) {
    return this.fb.group({
      id,
      value: [value, Validators.required],
      attr_id,
      attribute
    })
  }

  changeEditMode(val: boolean) {
    if(val) {
      this.form.enable();
    } else {
      this.form.disable();
    }

    this.isEdit = val;
  }

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  private makeEmptyProduct() {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      desc: [null],
      attr_set_id: [null],
      variants: this.fb.array([
        this.makeEmptyVariant()
      ])
    });
  }

  private makeEmptyVariant() {
    return this.fb.group({
      price: [null, Validators.required],
      desc: [null],
      weight: [null],
      is_discount: [null],
      is_available: [null],
      in_stock_qty: [null],
      discount_price: [null],
      attrs: this.fb.array([])
    })
  }

  addVariant() {
    (this.form.get('variants') as FormArray).push(this.makeEmptyVariant());
  }

  removeVariant(i: number) {
    (this.form.get('variants') as FormArray).removeAt(i);
  }

  delete() {
    this.deleteProduct.emit(this.form.get('id').value);
  }

  private makeEmptyPAttrValue() {
    return this.fb.group({
      id: [null],
      value: [null, Validators.required],
      attr_id: [null],
      attribute: [null]
    })
  }

  addAttribute(i: number) {
    const variant = (this.form.get('variants') as FormArray).at(i);
    (variant.get('attrs') as FormArray).push(this.makeEmptyPAttrValue())
  }

  removeAttribute(i: number, j: number) {
    const variant = (this.form.get('variants') as FormArray).at(i);
    (variant.get('attrs') as FormArray).removeAt(j);
  }
}
