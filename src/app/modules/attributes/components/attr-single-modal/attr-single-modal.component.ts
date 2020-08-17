import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {AttributeState} from "@modules/attributes/store/attribute.state";
import {Observable} from "rxjs";
import {NzSelectOptionInterface} from "ng-zorro-antd";
import {map} from "rxjs/operators";
import {AttributeCreate, AttributeUpdate} from "@modules/attributes/store/attribute.actions";
import {Attribute} from "@modules/attributes/types";

@Component({
  selector: 'app-attr-single-modal',
  templateUrl: './attr-single-modal.component.html',
  styleUrls: ['./attr-single-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttrSingleModalComponent implements OnInit, OnChanges {

  @Input() type: 'create' | 'update' | 'show' = 'show';
  @Input() attr: Attribute;

  @Output() modalEvent = new EventEmitter<Attribute>();

  types$: Observable<NzSelectOptionInterface[]> = this.store.select(AttributeState.types)
    .pipe(
      map((types) => types.map(t => ({value: t.id, label: t.type})))
    );

  form = this.fb.group({
    name: [null, Validators.required],
    type_id: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    if (this.attr) {
      this.form.patchValue({name: this.attr.name, type_id: this.attr.type.id});
    }
  }

  submit() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.valid) {
      const attribute = {...this.attr, ...this.form.value};
      switch (this.type) {
        case "create":
          this.store.dispatch(new AttributeCreate({attribute})).subscribe(() => this.modalEvent.emit(attribute));
          break;

        case "update":
          this.store.dispatch(new AttributeUpdate({attribute})).subscribe(() => this.modalEvent.emit(attribute));
          break;

        default:
          console.log('WTF!?', this.type);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.attr) {
      this.form.patchValue({name: this.attr.name, type_id: this.attr.type.id});
    }
  }

}
