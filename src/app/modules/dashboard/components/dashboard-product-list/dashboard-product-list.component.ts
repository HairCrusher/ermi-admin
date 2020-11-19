import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {Select} from "@ngxs/store";
import {DashboardState} from "@modules/dashboard/store/dashboard.state";
import {Observable} from "rxjs";
import {EsAttrValue, EsProduct} from "@modules/dashboard/types";
import {faRubleSign} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-product-list',
  templateUrl: './dashboard-product-list.component.html',
  styleUrls: ['./dashboard-product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardProductListComponent implements OnInit {

  readonly imgs = {faRubleSign};

  @Output()
  onPageChange = new EventEmitter<number>();

  @Input()
  pageSize = 20;

  @Select(DashboardState.totalProducts)
  totalProducts$: Observable<number>;

  @Select(DashboardState.products)
  products$: Observable<EsProduct[]>;

  @Select(DashboardState.loading)
  loading$: Observable<boolean>;

  pageIndex = 1;

  constructor() { }

  ngOnInit(): void {
  }

  keyValue(attrs: EsAttrValue) {
    return Object.values(attrs);
  }

  pageChange(index: number) {
    this.pageIndex = index;
    this.onPageChange.emit();
  }

  trackById = (_, item: EsProduct) => item.id;
}
