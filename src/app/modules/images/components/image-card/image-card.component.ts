import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Image} from "@modules/images/types";
import {NzModalService} from "ng-zorro-antd";
import {ImageViewComponent} from "@modules/images/components/image-view/image-view.component";

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCardComponent implements OnInit {

  @Input() image: Image;

  get url(): string {
    if(!this.image) {
      return '';
    }

    const {medium_uri, original_uri} = this.image;
    return `"${medium_uri || original_uri}"`;
  }

  constructor(
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  open() {
    this.modalService.create({
      nzContent: ImageViewComponent,
      nzComponentParams: {
        image: this.image
      },
      nzFooter: null,
      nzWidth: '70%'
    });
  }

}
