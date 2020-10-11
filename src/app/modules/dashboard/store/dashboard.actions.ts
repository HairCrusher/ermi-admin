import {EsProductSearchFilters} from "@modules/dashboard/types";

export class DashboardSearchProducts {
  public static readonly type = '[Dashboard] Search products';
  constructor(public payload: { filters?: EsProductSearchFilters }) {
  }
}

// TODO move to suppliers
export class UpdateProductsManually {
  public static readonly type = '[Dashboard] Update products';
}
