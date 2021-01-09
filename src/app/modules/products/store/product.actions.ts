import {Product} from "@modules/products/types";
import {FetchOptions} from "../../../types";

export class ProductFetch {
  public static readonly type = '[Product] Fetch products';
  constructor(public payload: { options: FetchOptions }) {
  }
}

export class ProductGet {
  public static readonly type = '[Product] Get product';
  constructor(public payload: { id: number }) {
  }
}

export class ProductCreate {
  public static readonly type = '[Product] Create product';
  constructor(public payload: { product: Product }) {
  }
}

export class ProductEdit {
  public static readonly type = '[Product] Edit product';
  constructor(public payload: { product: Product }) {
  }
}

export class ProductDelete {
  public static readonly type = '[Product] Delete product';
  constructor(public payload: { id: number }) {
  }
}
