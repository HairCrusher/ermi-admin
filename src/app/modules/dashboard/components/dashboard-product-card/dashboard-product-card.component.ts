import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EsProduct} from "@modules/dashboard/types";
import {faRubleSign} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-product-card',
  templateUrl: './dashboard-product-card.component.html',
  styleUrls: ['./dashboard-product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardProductCardComponent implements OnInit, OnChanges {

  readonly imgs = {faRubleSign};

  @Input() product: EsProduct;

  image: string;

  get attrs() {
    if(!this.product) {
      return [];
    }

    return Object.values(this.product.attrs);
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.product) {
      if (this.product.images?.length) {
        this.image = this.product.images[0].original_uri;
      }
    }
  }
}
