import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Image} from "@modules/images/types";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductImageComponent implements OnInit {

  @Input() image: Image;

  @Output() deleteEvent = new EventEmitter<Image>();

  get url(): string {
    if(!this.image) {
      return '';
    }

    const {medium_uri, original_uri} = this.image;
    return `url("${medium_uri || original_uri}")`;
  }

  constructor(
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalService.create({
      nzContent:`<img width="100%" src="${this.image.original_uri}" />`,
      nzFooter: null
    })
  }
}
