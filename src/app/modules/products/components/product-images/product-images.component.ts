import {Component, OnInit, ChangeDetectionStrategy, forwardRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Image} from "@modules/images/types";
import {CdkDragDrop, moveItemInArray, CdkDrag} from '@angular/cdk/drag-drop'
import {NzModalService} from "ng-zorro-antd";
import {ImageListComponent} from "@modules/images/components/image-list/image-list.component";

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductImagesComponent),
      multi: true
    }
  ]
})
export class ProductImagesComponent implements OnInit, ControlValueAccessor {

  @ViewChild(CdkDrag) cdkDrag: CdkDrag;

  images: Image[] = [];
  isDisabled = false;

  constructor(
    private cd: ChangeDetectorRef,
    private modalService: NzModalService
  ) {
  }

  ngOnInit(): void {
  }

  onChange(images: Image[]) {
  }

  onTouched() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(images: Image[]): void {
    this.images = [...images].sort((a, b) => a.ProductVariantImgModel.position - b.ProductVariantImgModel.position);
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
    this.cd.markForCheck();
  }

  listChange(list: CdkDragDrop<Image[]>) {
    const tempArr = [...this.images];
    moveItemInArray(tempArr, list.previousIndex, list.currentIndex);
    this.images = tempArr;
    this.onChange(this.images);
  }

  delete({id}: Image) {
    this.images = this.images.filter(x => x.id !== id);
    this.onChange(this.images);
  }

  addImages() {
    this.modalService.create<ImageListComponent>({
      nzContent: ImageListComponent,
      nzComponentParams: {
        selectable: true,
        checkedImages: this.images
      },
      nzWidth: "90%",
      nzOnOk: ({checkedImages}) => {
        this.images = checkedImages;
        this.onChange(this.images);
        this.cd.markForCheck();
      }
    })
  }
}
