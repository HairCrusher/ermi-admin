import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LayoutService} from "../../../../services/layout.service";
import {Select, Store} from "@ngxs/store";
import {ProductState} from "@modules/products/store/product.state";
import {Observable} from "rxjs";
import {Product} from "@modules/products/types";
import {ProductFetch} from "@modules/products/store/product.actions";

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit, AfterViewInit {

  @ViewChild('extras') extras: TemplateRef<any>;

  @Select(ProductState.products)
  products$: Observable<Product[]>;

  constructor(
    private layoutService: LayoutService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new ProductFetch());
    this.layoutService.setTitle('Products');
  }

  ngAfterViewInit(): void {
    this.layoutService.setExtrasTmpl(this.extras);
  }

}
