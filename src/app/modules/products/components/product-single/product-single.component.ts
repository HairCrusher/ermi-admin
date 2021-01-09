import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
  ChangeDetectorRef, OnChanges, SimpleChanges
} from '@angular/core';
import {AttrValue, Product, ProductVariant} from "@modules/products/types";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngxs/store";
import {AttrSetState} from "@modules/attr-sets/store/attr-set.state";
import {NzModalService, NzSelectOptionInterface} from "ng-zorro-antd";
import {ProductAttrModalComponent} from "@modules/products/components/product-attr-modal/product-attr-modal.component";
import {faTrashAlt, faPenAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSingleComponent implements OnInit, OnChanges {

  readonly icons = {faTrashAlt, faPenAlt};

  @Input() product: Product;

  @Output() submitForm = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<number>();

  attrSets = this.store.select(AttrSetState.attrSets)
    .pipe(map(x => x.map<NzSelectOptionInterface>(a => ({label: a.name, value: a.id}))));

  isEdit = false;
  showEditSwitch = true;

  loading = true;

  form = this.fb.group({
    id: [null],
    name: [name, Validators.required],
    desc: [null],
    attr_set_id: [null],
    variants: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(f => console.log('form', f));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('PRODUCT', this.product);
    if (this.product) {
      this.loading = false;
      this.makeProduct(this.product);
      this.showEditSwitch = true;
      this.form.disable();
      this.isEdit = false;
    } else {
      this.loading = false;
      this.makeEmptyProduct();
      this.showEditSwitch = false;
      this.isEdit = true;
    }

    console.log('FORM', this.form);
  }

  trackByVariants(i, {id}: ProductVariant) {
    return id;
  }

  private makeProduct(product: Product) {
    const variants = this.form.get('variants') as FormArray;
    this.clearFormArr(variants);
    product.variants.forEach(v => {
      variants.push(this.fb.control(v))
    })
    this.form.patchValue(product);
  }

  private clearFormArr(arr: FormArray) {
    while (arr.length) {
      arr.removeAt(0);
    }
  }

  changeEditMode(val: boolean) {
    if (val) {
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
    this.form.reset(this.fb.group({
      id: [null],
      name: [null, Validators.required],
      desc: [null],
      attr_set_id: [null],
      variants: this.fb.array([
        this.makeEmptyVariant()
      ])
    }));
  }

  private makeEmptyVariant() {
    return this.fb.control({
      price: null,
      desc: null,
      weight: null,
      is_discount: null,
      is_available: null,
      in_stock_qty: null,
      discount_price: null,
      attrs: []
    })
  }

  addVariant() {
    (this.form.get('variants') as FormArray).push(this.makeEmptyVariant());
  }

  delete() {
    this.deleteProduct.emit(this.form.get('id').value);
  }
}
