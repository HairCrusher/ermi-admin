import {Attribute} from "@modules/attributes/types";

export type Product = {
  id?: number;
  name?: string;
  desc?: string;
  attr_set_id?: number;
  variants?: ProductVariant[];
}

export type ProductVariant = {
  id?: number;
  desc?: string;
  price: number;
  discount_price?: number;
  weight?: number;
  in_stock_qty?: number;
  is_available?: boolean;
  is_discount?: boolean;
  attrs?: AttrValue[];
}

export type AttrValue = {
  id?: number;
  value?: string;
  attr_id?: number;
  attribute: Attribute
};
