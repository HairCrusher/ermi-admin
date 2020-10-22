import {Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit} from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {Store} from "@ngxs/store";
import {DashboardSearchProducts} from "@modules/dashboard/store/dashboard.actions";
import {EsProductSearchData} from "@modules/dashboard/types";
import {DashboardProductFiltersComponent} from "@modules/dashboard/components/dashboard-product-filters/dashboard-product-filters.component";
import {DashboardProductListComponent} from "@modules/dashboard/components/dashboard-product-list/dashboard-product-list.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(DashboardProductFiltersComponent) filters: DashboardProductFiltersComponent;
  @ViewChild(DashboardProductListComponent) list: DashboardProductListComponent;

  pageSize = 20;

  constructor(
    private layoutService: LayoutService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.layoutService.setTitle('Ermi');
  }

  ngAfterViewInit() {
    this.search();
  }

  search() {
    const filters = this.filters.filters;
    const from = this.list.pageIndex - 1;
    this.store.dispatch(new DashboardSearchProducts({data: {filters, from, size: this.pageSize}}));
  }
}
