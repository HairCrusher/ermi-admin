import {Action, Selector, State, StateContext} from "@ngxs/store";
import {DashboardService} from "@modules/dashboard/services/dashboard.service";
import {DashboardSearchProducts, UpdateProductsManually} from "./dashboard.actions";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {EsFilter, EsProdAggAttr, EsProduct} from "@modules/dashboard/types";

export interface DashboardStateModel {
  products: EsProduct[];
  totalProducts: number;
  loading: boolean;
  filters: EsFilter[];
  enableFilters: EsFilter[]
}

@Injectable()
@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    products: [],
    totalProducts: null,
    loading: false,
    filters: [],
    enableFilters: []
  }
})
export class DashboardState {

  constructor(
    private productFS: DashboardService
  ) {
  }

  @Selector()
  static products({products}: DashboardStateModel) {
    return products;
  }

  @Selector()
  static totalProducts({totalProducts}: DashboardStateModel) {
    return totalProducts;
  }

  @Selector()
  static loading({loading}: DashboardStateModel) {
    return loading;
  }

  @Selector()
  static filters({filters}: DashboardStateModel) {
    return filters;
  }

  @Selector()
  static enableFilters({enableFilters}: DashboardStateModel) {
    return enableFilters;
  }

  @Action(DashboardSearchProducts)
  searchProducts(
    {patchState}: StateContext<DashboardStateModel>,
    {payload: {data}}: DashboardSearchProducts
  ) {
    patchState({loading: true});
    return this.productFS.search(data).pipe(
      tap(({products, total, aggregations}) => {
        const esFilters = this.parseFilters(aggregations);
        if (!data?.filters?.length) {
          patchState({enableFilters: esFilters});
        }
        patchState({
          products,
          totalProducts: total,
          loading: false,
          filters: esFilters
        })
      })
    );
  }

  @Action(UpdateProductsManually)
  updateProductsManually(
    {patchState}: StateContext<DashboardStateModel>,
  ) {
    patchState({loading: true});
    return this.productFS.updateStoreManually().pipe(tap(() => patchState({loading: false})));
  }

  private parseFilters(attrs: { [p: string]: EsProdAggAttr | number }): EsFilter[] {

    const filters: EsFilter[] = Object.entries(attrs).map(([key, value]) => {
      try {
        const slug = key.split('.')[1];

        return {
          slug,
          variants: (value as EsProdAggAttr).buckets
        }
      } catch (e) {
        console.log('parseFilters ERROR', e);
      }
    });
    filters.shift();
    if (!filters.length) {
      return [];
    } else {
      return filters;
    }
  }
}
