import {Product} from "@modules/products/types";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {ProductCreate, ProductDelete, ProductFetch, ProductGet} from "./product.actions";
import {ProductService} from "@modules/products/services/product.service";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {of} from "rxjs";

export interface ProductStateModel {
  product: Product,
  products: Product[];
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
    product: null
  }
})
@Injectable()
export class ProductState {
  constructor(
    private productService: ProductService
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

  @Action(ProductFetch)
  fetchProduct(
    {patchState, getState}: StateContext<ProductStateModel>,
    {payload: {options}}: ProductFetch
  ) {
    if(!getState().products.length) {
      return this.productService.list(options).pipe(tap(products => patchState({products})))
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
      return this.productService.get(id).pipe(tap(p => patchState({product: p})));
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

  @Action(ProductDelete)
  deleteProduct(
    {patchState, getState}: StateContext<ProductStateModel>,
    {payload: {id}}: ProductDelete
  ) {
    const products = getState().products.filter(p => p.id !== id);
    return this.productService.delete(id).pipe(tap(() => patchState({products, product: null})));
  }

}
