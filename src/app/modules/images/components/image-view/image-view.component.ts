import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Image} from "@modules/images/types";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {ImageDelete} from "@modules/images/store/images.actions";

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageViewComponent implements OnInit {

  @Input() image: Image;

  form = this.fb.group({
    name: [null, Validators.required],
    position: [null],
    id: [{value: null, disabled: true}],
    original_uri: [{value: null, disabled: true}],
    large_uri: [{value: null, disabled: true}],
    medium_uri: [{value: null, disabled: true}],
    small_uri: [{value: null, disabled: true}],
    thumbnail_uri: [{value: null, disabled: true}],
    mimetype: [{value: null, disabled: true}],
    size: [{value: null, disabled: true}],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.image);
  }

  save() {
  }

  delete() {
    this.store.dispatch(new ImageDelete({id: this.image.id}));
  }
}
