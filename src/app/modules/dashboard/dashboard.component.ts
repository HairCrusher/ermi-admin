import {Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit} from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {Store} from "@ngxs/store";
import {DashboardSearchProducts} from "@modules/dashboard/store/dashboard.actions";
import {DashboardProductFiltersComponent} from "@modules/dashboard/components/dashboard-product-filters/dashboard-product-filters.component";
import {DashboardProductListComponent} from "@modules/dashboard/components/dashboard-product-list/dashboard-product-list.component";
import {environment} from "../../../environments/environment";
import {LocalStorageService} from "ngx-localstorage";
import {SearchInputComponent} from "@modules/dashboard/components/search-input/search-input.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(DashboardProductFiltersComponent) filters: DashboardProductFiltersComponent;
  @ViewChild(DashboardProductListComponent) list: DashboardProductListComponent;
  @ViewChild(SearchInputComponent) searchInput: SearchInputComponent;

  pageSize = 21;

  constructor(
    private layoutService: LayoutService,
    private store: Store,
    private localStorage: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.layoutService.setTitle('Ermi');
  }

  ngAfterViewInit() {
    this.search();
  }

  search() {
    const filters = this.filters.filters;
    const from = (this.list.pageIndex - 1) * this.pageSize;
    const extFilters = this.localStorage.get(environment.wheelSizeCookieName);
    const searchString = this.searchInput.searchString;
    this.store.dispatch(new DashboardSearchProducts({
      data: {
        filters,
        extFilters,
        from,
        size: this.pageSize,
        searchString
      }
    }));
  }
}
