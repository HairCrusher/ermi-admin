import {Product} from "@modules/products/types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'product 1',
    desc: 'desc 1',
    variants: [
      {
        id: 1,
        desc: 'variant desc 1',
        price: 9000,
        discount_price: 8000,
        in_stock_qty: 10,
        is_available: true,
        is_discount: true,
        weight: 2,
        attrs: [
          {
            id: 1,
            attr_id: 1,
            value: 'asd',
            attribute: {
              name: 'sub title',
              id: 1,
              type_id: 1,
              type: {
                id: 1,
                type: 'string',
              }
            }
          }
        ]
      },
      {
        id: 2,
        desc: 'variant desc 2',
        price: 91100,
        discount_price: 8000,
        in_stock_qty: 10,
        is_available: true,
        is_discount: true,
        weight: 2,
        attrs: [
          {
            id: 1,
            attr_id: 1,
            value: 'asd',
            attribute: {
              name: 'sub title',
              id: 1,
              type_id: 1,
              type: {
                id: 1,
                type: 'string',
              }
            }
          },
          {
            id: 2,
            attr_id: 2,
            value: '4000',
            attribute: {
              name: 'spec price',
              id: 2,
              type_id: 2,
              type: {
                id: 2,
                type: 'decimal',
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'product 2',
    desc: 'desc 2',
    variants: [
      {
        id: 1,
        price: 300,
        discount_price: 100,
        in_stock_qty: 232,
        is_available: true,
        is_discount: false,
        weight: 0.5,
        attrs: [
          {
            id: 2,
            attr_id: 2,
            value: '1123.32',
            attribute: {
              name: 'spec price2',
              id: 3,
              type_id: 2,
              type: {
                id: 2,
                type: 'decimal',
              }
            }
          }
        ]
      }
    ]
  }
];
