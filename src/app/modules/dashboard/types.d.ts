import {NzSelectOptionInterface} from "ng-zorro-antd";
import {Image} from "@modules/images/types";

export interface EsRespProduct {
  hits: {
    total: {
      value: number;
      relation: string;
    },
    max_score: number;
    hits: {
      _source: EsProduct
    }[]
  },
  aggregations: {
    attrs: {
      doc_count: number;
      [x: string]: EsProdAggAttr | number;
    }
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
  id: number;
  name: string;
  desc?: string;
  cats_ids: number[];
  attr_set_id: number;
  variants: EsProductVariant[]
}

export interface EsProductVariant {
  id?: number;
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

export interface EsAttrValue {
  [k: string]: {
    name: string;
    value: string | boolean | number;
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
  size?: number;
  from?: number;
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

export interface WSSearchItem {
  name: string;
  type?: any;
  value: string | number | string[] | number[];
}
