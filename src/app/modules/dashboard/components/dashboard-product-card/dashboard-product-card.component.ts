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
      //TODO add cat check
      if (true) {
        let count = 0;
        let spacing = 0;
        const attrs = Object.values(this.product.attrs)
          .reduce<CardAttr[]>((acc, {name, value, slug}) => {
            if (slug === 'bolts-count') {
              count = parseInt(value.toString());
              return acc;
            }
            if (slug === 'bolts-spacing') {
              spacing = parseInt(value.toString());
              return acc;
            }
            if (slug === 'pcd') {
              return acc;
            }
            acc.push({
              value,
              name
            });
            return acc;
          }, []);

        if (count && spacing) {
          attrs.push({
            name: 'PCD',
            value: `${count}X${spacing}`
          })
        }

        this.attrs = attrs;
        return;
      }

      this.attrs = Object.values(this.product.attrs)
        .map<CardAttr>(({name, value}) => ({name, value}));
    }
  }
}
