import {Product} from "@modules/products/types";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {ProductCreate, ProductDelete, ProductEdit, ProductFetch, ProductGet} from "./product.actions";
import {ProductAdminService} from "@modules/products/services/product-admin.service";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {of} from "rxjs";

export interface ProductStateModel {
  product: Product,
  products: Product[];
  loading: boolean;
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
    product: null,
    loading: false
  }
})
@Injectable()
export class ProductState {
  constructor(
    private productService: ProductAdminService
  ) {
  }

  @Selector()
  static product({product}: ProductStateModel) {
    return product;
  }

  @Selector()
  static products({products}: ProductStateModel) {
    return products;
  }

  @Selector()
  static loading({loading}: ProductStateModel) {
    return loading;
  }

  @Action(ProductFetch)
  fetchProduct(
    {patchState, getState}: StateContext<ProductStateModel>,
    {payload: {options}}: ProductFetch
  ) {
    if (!getState().products.length) {
      patchState({loading: true});
      return this.productService.list(options).pipe(tap(products => patchState({products, loading: false})))
    }
  }

  @Action(ProductGet)
  getProduct(
    {patchState, getState}: StateContext<ProductStateModel>,
    {payload: {id}}: ProductGet
  ) {
    const {products, product: prod} = getState();
    if (prod?.id === id) {
      return of(prod);
    } else {
      patchState({product: null});
    }

    const product = products.find(p => p.id === id);
    if (product) {
      patchState({product});
      return of(product);
    } else {
      return this.productService.get(id).pipe(tap(p => patchState({product: p, loading: true})));
    }
  }

  @Action(ProductCreate)
  createProduct(
    {patchState, getState}: StateContext<ProductStateModel>,
    {payload: {product}}: ProductCreate
  ) {
    return this.productService.create(product).pipe(tap((product) => {
      const {products} = getState();
      patchState({products: [...products, product], product});
    }));
  }

  @Action(ProductEdit)
  editProduct(
    {patchState, getState}: StateContext<ProductStateModel>,
    {payload: {product}}: ProductEdit
  ) {
    return this.productService.update(product.id, product).pipe(tap(() => {
      const state = getState();
      const products = [...state.products];
      const i = products.findIndex(p => p.id === product.id);
      if (i >= 0) {
        products[i] = product;
        patchState({products});
      }
    }));
  }

  @Action(ProductDelete)
  deleteProduct(
    {patchState, getState}: StateContext<ProductStateModel>,
    {payload: {id}}: ProductDelete
  ) {
    const products = getState().products.filter(p => p.id !== id);
    return this.productService.delete(id).pipe(tap(() => patchState({products, product: null})));
  }

}
