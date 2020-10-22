import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from "@modules/dashboard/dashboard-routing.module";
import {SharedModule} from "@modules/shared/shared.module";
import {DashboardProductListComponent} from './components/dashboard-product-list/dashboard-product-list.component';
import {DashboardProductFiltersComponent} from './components/dashboard-product-filters/dashboard-product-filters.component';
import {
  NzBadgeModule,
  NzButtonModule,
  NzCardModule, NzFormModule,
  NzGridModule,
  NzListModule, NzPaginationModule, NzSelectModule,
  NzTableModule,
  NzTypographyModule
} from "ng-zorro-antd";
import {NgxsModule} from "@ngxs/store";
import {DashboardState} from "@modules/dashboard/store/dashboard.state";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { WheelSizeFilterComponent } from './components/wheel-size-filter/wheel-size-filter.component';


@NgModule({
  declarations: [DashboardComponent, DashboardProductListComponent, DashboardProductFiltersComponent, WheelSizeFilterComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    NgxsModule.forFeature([DashboardState]),
    FontAwesomeModule,
    NzButtonModule,
    NzTableModule,
    NzListModule,
    NzGridModule,
    NzCardModule,
    NzTypographyModule,
    NzFormModule,
    NzSelectModule,
    NzBadgeModule,
    NzPaginationModule
  ]
})
export class DashboardModule {
}
