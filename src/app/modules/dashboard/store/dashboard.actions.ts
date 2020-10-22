import {EsProductSearchData} from "@modules/dashboard/types";

export class DashboardSearchProducts {
  public static readonly type = '[Dashboard] Search products';
  constructor(public payload: { data?: EsProductSearchData }) {
  }
}

// TODO move to suppliers
export class UpdateProductsManually {
  public static readonly type = '[Dashboard] Update products';
}
