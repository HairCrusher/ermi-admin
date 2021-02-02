import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CardAttr, EsProduct} from "@modules/dashboard/types";
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
  attrs: CardAttr[];

  itemsCount = 4;

  constructor() {
  }

  ngOnInit(): void {
    this.setAttrs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.product) {
      if (this.product.images?.length) {
        this.image = this.product.images[0].original_uri;
      }

      this.setAttrs();
    }
  }

  private setAttrs() {
    if (this.product) {
      const hiddenAttrs = ['bolts-count', 'bolts-spacing'];
      this.attrs = Object.values(this.product.attrs)
        .filter(({slug}) => !hiddenAttrs.includes(slug))
        .map<CardAttr>(({name, value}) => ({name, value}))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
