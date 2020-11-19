import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {Actions, ofActionSuccessful, Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {ImagesState} from "@modules/images/store/images.state";
import {Image} from "@modules/images/types";
import {NzModalService, NzNotificationService, NzTableQueryParams} from "ng-zorro-antd";
import {ImageDelete, ImagesFetch} from "@modules/images/store/images.actions";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ImageUploadComponent} from "@modules/images/components/image-upload/image-upload.component";

@UntilDestroy()
@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageListComponent implements OnInit {

  @Output() queryParamsChangeEvent = new EventEmitter<NzTableQueryParams>();

  @Input() pageSize = 20;
  @Input() total = 0;
  @Input() pageIndex = 1;

  @Input() selectable = false;
  @Input() checkedImages: Image[] = [];

  @Select(ImagesState.images)
  images$: Observable<Image[]>;

  @Select(ImagesState.loading)
  loading$: Observable<boolean>;

  @Select(ImagesState.total)
  total$: Observable<number>;

  trackById = (_, {id}) => id;

  constructor(
    private store: Store,
    private actions: Actions,
    private modalService: NzModalService,
    private notify: NzNotificationService
  ) {
  }

  ngOnInit(): void {
    this.fetch();

    this.actions.pipe(
      untilDestroyed(this),
      ofActionSuccessful(ImageDelete)
    ).subscribe(() => {
      this.modalService.closeAll();
      this.notify.success('Success', 'Image successfully deleted');
    });
  }

  pageIndexChange(index: number) {
    this.pageIndex = index;
    this.fetch();
  }

  fetch(): void {
    const {pageSize, pageIndex} = this;
    this.store.dispatch(new ImagesFetch({options: {limit: pageSize, offset: (pageIndex - 1) * pageSize}}));
  }

  openUploadModal() {
    const modal = this.modalService.create<ImageUploadComponent>({
      nzContent: ImageUploadComponent,
      nzFooter: null
    });

    modal.componentInstance.uploadSuccessEvent.subscribe(() => this.fetch());
  }

  isCheckedImage(image: Image): boolean {
    return this.checkedImages.map(({id}) => id).includes(image.id);
  }

  checkedChange(image: Image) {
    if(this.isCheckedImage(image)) {
      this.checkedImages = this.checkedImages.filter(x => x.id !== image.id);
    } else {
      this.checkedImages = [...this.checkedImages, image];
    }
  }
}
