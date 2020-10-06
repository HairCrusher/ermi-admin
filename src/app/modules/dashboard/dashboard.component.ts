import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {Store} from "@ngxs/store";
import {DashboardSearchProducts} from "@modules/dashboard/store/dashboard.actions";
import {EsProductSearchFilters} from "@modules/dashboard/types";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  pageSize = 20;
  lastFilters: EsProductSearchFilters;

  constructor(
    private layoutService: LayoutService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.layoutService.setTitle('Ermi');
    this.search({});
  }

  search(filters: EsProductSearchFilters) {
    this.lastFilters = filters;
    this.store.dispatch(new DashboardSearchProducts({filters: {...filters, size: this.pageSize}}));
  }

  changePage(pageIndex: number) {
    this.store.dispatch(new DashboardSearchProducts({
      filters: {...this.lastFilters, size: this.pageSize, from: (pageIndex - 1) * this.pageSize},
    }))
  }
}
