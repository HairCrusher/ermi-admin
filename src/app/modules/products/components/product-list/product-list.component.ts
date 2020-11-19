import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Product} from "@modules/products/types";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {ProductState} from "@modules/products/store/product.state";
import {Observable} from "rxjs";
import {NzTableQueryParams} from "ng-zorro-antd";
import {ProductFetch} from "@modules/products/store/product.actions";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  @Input() limit = 20;
  @Input() pageIndex = 1;

  @Output() queryParamsChangeEvent = new EventEmitter<NzTableQueryParams>();

  @Input() pageSize = 20;
  @Input() total = 0;

  @Select(ProductState.products)
  products$: Observable<Product[]>;

  @Select(ProductState.loading)
  loading$: Observable<boolean>;

  @Select(ProductState.total)
  total$: Observable<number>;

  icons = {faEdit};

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  queryParamsChange(params: NzTableQueryParams) {
    this.pageIndex = params.pageIndex
    this.fetch();
  }

  fetch() {
    const {limit, pageIndex} = this;
    this.store.dispatch(new ProductFetch({options: {limit, offset: (pageIndex - 1) * limit}}));
  }

  listParamsChange({pageIndex}: NzTableQueryParams) {
    this.pageIndex = pageIndex
    this.fetch();
  }
}
