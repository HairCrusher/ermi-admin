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

  title: string;
  image: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.product) {
      if (this.product.images?.length) {
        this.image = this.product.images[0].original_uri;
      }

      this.setTitle();
    }
  }

  private setTitle() {
    const model = this.product.attrs?.model?.value || 'стальной';
    const brand = this.product.attrs.brand.value;
    const width = this.product.attrs.width.value;
    const diameter = this.product.attrs.diameter.value;
    const boltsSpacing = this.product.attrs['bolts-spacing'].value;
    const boltsCount = this.product.attrs['bolts-count'].value;

    const dia = this.product.attrs.dia.value;
    const et = this.product.attrs.dia.value;

    const color = this.product.attrs.color.value;

    this.title = `Диск ${brand} ${model} ${width}x${diameter}/${boltsSpacing}x${boltsCount} D${dia} ET${et} ${color}`;
  }
}
