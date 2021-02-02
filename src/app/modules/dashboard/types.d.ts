import {NzSelectOptionInterface} from "ng-zorro-antd";
import {Image} from "@modules/images/types";

export interface EsRespProduct {
  total: number;
  products: EsProduct[];
  aggregations: {
    [x: string]: EsProdAggAttr | number;
  }
}

export interface EsProdAggAttr {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: Bucket[];
}

export interface Bucket {
  key: number | string;
  doc_count: number;
}

export interface EsProduct {
  id?: number;
  name: string;
  product_id: number;
  vendor_code: string;
  desc?: string;
  price: number;
  price_discount?: number;
  weight?: number;
  in_stock_qty: number;
  is_available: boolean;
  is_discount: boolean;
  attrs: EsAttrValue;
  images: Image[];
}

export interface ExpandedTableProduct extends EsProduct {
  expand: boolean;
}

export interface EsAttrValue {
  [k: string]: {
    name: string;
    value: string | boolean | number;
    slug: string;
    type: string;
  };
}

export interface EsFilter {
  slug: string;
  variants: Bucket[]
}

export interface EsProductFilter {
  name: string;
  type?: any; // TODO add filter type
  value: string | number | string[] | number[];
}

export interface EsProductSearchData {
  filters?: EsProductFilter[];
  extFilters?: {
    filters: SearchAttrsParams;
    data: WSSearchItem[][];
  };
  size?: number;
  from?: number;
  searchString?: string;
}

export interface Filter {
  name: string;
  type?: any; // TODO add filter type
  value: string | number | string[] | number[];
}


export interface FilterOption extends NzSelectOptionInterface {
  count: number;
}

export interface OptionsMap {
  [key: string]: FilterOption[]
}

// WHEEL-SIZE +++++++++++++++++++++++

export interface WSMake {
  slug: string;
  name: string;
  name_en: string;
}

export interface WSYear {
  slug: number;
  name: number;
}

export interface WSModel {
  slug: string;
  name: string;
  name_en: string;
}

export interface ParamsPair {
  diameter: number;
  width: number;
  et: number;
  boltsCount: number;
  boltsSpacing: number;
  esFilters: WSSearchItem[][];
}

export interface WSSearchItem {
  name: string;
  type?: any;
  value: string | number | string[] | number[];
}

export interface AttrObj {
  name: string;
  value: string | boolean | number;
  slug: string;
  type: string;
}

export interface SearchAttrsParams {
  make: string,
  year: string,
  model: string,
  generation: string,
  trim: string
}

export interface CardAttr {
  name: string;
  value: any;
}
