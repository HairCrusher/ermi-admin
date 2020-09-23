import {EsProductSearchFilters} from "@modules/dashboard/types";

export class DashboardSearchProducts {
  public static readonly type = '[Dashboard] Search products';
  constructor(public payload: { filters?: EsProductSearchFilters }) {
  }
}
