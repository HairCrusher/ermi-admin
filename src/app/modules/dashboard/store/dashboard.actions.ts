import {EsProductSearchData} from "@modules/dashboard/types";

export class DashboardSearchProducts {
  public static readonly type = '[Dashboard] Search products';
  constructor(public payload: { data?: EsProductSearchData }) {
  }
}
