import {Component, ChangeDetectionStrategy, Input, ViewContainerRef, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {AttributeState} from "@modules/attributes/store/attribute.state";
import {NzModalService, NzSelectOptionInterface} from "ng-zorro-antd";
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Attribute} from "@modules/attributes/types";
import {AttrSingleModalComponent} from "@modules/attributes/components/attr-single-modal/attr-single-modal.component";

type InputTypes = 'text' | 'number' | 'checkbox';

@UntilDestroy()
@Component({
  selector: 'app-product-attr-modal',
  templateUrl: './product-attr-modal.component.html',
  styleUrls: ['./product-attr-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAttrModalComponent implements OnInit {

  @Input() data;

  form = this.fb.group({
    attr_id: [null, Validators.required],
    value: [null, Validators.required],
    attribute: [null]
  });

  private attrs: Attribute[] = [];
  attributes$: Observable<NzSelectOptionInterface[]> = this.store.select(AttributeState.attributes)
    .pipe(
      tap(attrs => this.attrs = attrs),
      map(x => x.map<NzSelectOptionInterface>(a => ({label: a.name, value: a.id})))
    );

  inputType$ = new BehaviorSubject<InputTypes>('text');

  constructor(private fb: FormBuilder, private store: Store, private modal: NzModalService, private ref: ViewContainerRef) {
    this.form.get('attr_id').valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(this.setInputType.bind(this));
  }

  ngOnInit(): void {
    if(this.data) {
      this.form.patchValue(this.data);
    }
  }

  private setInputType(id: number) {
    const attribute = this.attrs.find(x => x.id === id);
    if (attribute) {
      let newType: InputTypes = 'text';
      switch (attribute.type.type) {
        case 'number':
        case 'decimal':
          newType = 'number';
          break;
      }

      this.inputType$.next(newType);
      this.form.patchValue({attribute});
    }
  }

  create() {
    const event = new EventEmitter();
    const modal = this.modal.create({
      nzTitle: 'Create new attribute',
      nzViewContainerRef: this.ref,
      nzContent: AttrSingleModalComponent,
      nzComponentParams: {
        type: 'create',
        modalEvent: event
      },
      nzFooter: null
    });

    event.subscribe(() => modal.close());
  }

}
