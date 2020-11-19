import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewContainerRef,
  Input,
  ChangeDetectorRef,
  Output, EventEmitter, forwardRef
} from '@angular/core';
import {ControlValueAccessor, FormArray, FormBuilder, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {AttrValue, ProductVariant} from "@modules/products/types";
import {faPenAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {ProductAttrModalComponent} from "@modules/products/components/product-attr-modal/product-attr-modal.component";
import {NzModalService} from "ng-zorro-antd";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {distinctUntilChanged} from "rxjs/operators";
import {isEqual} from 'lodash';

@UntilDestroy()
@Component({
  selector: 'app-product-variant',
  templateUrl: './product-variant.component.html',
  styleUrls: ['./product-variant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProductVariantComponent),
    multi: true
  }]
})
export class ProductVariantComponent implements OnInit, ControlValueAccessor {

  readonly icons = {faPenAlt, faTrashAlt};

  @Input() isEdit = false;

  @Output() removeVariantEvent = new EventEmitter();

  form = this.fb.group({
    id: [null],
    product_id: [null],
    desc: [null],
    weight: [null],
    is_discount: [null],
    is_available: [null],
    in_stock_qty: [null],
    price: [null, Validators.required],
    discount_price: [null],
    vendor_code: [null],
    images: [null],
    attrs: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      untilDestroyed(this),
      distinctUntilChanged((x, y) => isEqual(x, y))
    ).subscribe(f => this.onChange(f));
  }

  onChange(_: any) {
  }

  onTouched(_: any) {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(productVariant: ProductVariant): void {
    const attrs = this.form.get('attrs') as FormArray;
    this.clearFormArr(attrs);
    productVariant.attrs.forEach(a => attrs.push(this.makeProductAttrValue(a)));
    this.form.patchValue(productVariant);
  }

  private clearFormArr(arr: FormArray) {
    while (arr.length) {
      arr.removeAt(0);
    }
  }

  private makeProductAttrValue(attrValue: AttrValue) {
    return this.fb.group({
      ...attrValue,
      value: [attrValue.value, Validators.required],
    })
  }

  trackByAttrVal(i, {id, value}: AttrValue) {
    return "" + id + value;
  }

  addAttribute() {
    this.modal.create<ProductAttrModalComponent>({
      nzTitle: 'Select attribute',
      nzContent: ProductAttrModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: ({form: {value}}) => {
        const attr = this.fb.group({
          id: [null],
          value: [value.value, Validators.required],
          attr_id: [value.attr_id],
          attribute: [value.attribute]
        });
        (this.form.get('attrs') as FormArray).push(attr);
        this.cd.detectChanges();
      }
    });
  }

  editAttribute(i: number) {
    const attr = (this.form.get('attrs') as FormArray).at(i);

    this.modal.create<ProductAttrModalComponent>({
      nzTitle: 'Select attribute',
      nzContent: ProductAttrModalComponent,
      nzComponentParams: {data: attr.value},
      nzOnOk: ({form: {value}}) => {
        attr.patchValue({
          value: value.value,
          attr_id: value.attr_id,
          attribute: value.attribute
        });
        this.cd.markForCheck();
      }
    });
  }

  removeAttribute(i: number) {
    (this.form.get('attrs') as FormArray).removeAt(i);
  }

  removeVariant() {
    this.removeVariantEvent.emit();
  }
}
