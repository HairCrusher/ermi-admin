import {Component, OnInit} from '@angular/core';
import {LayoutService} from "../../../../services/layout.service";
import {Product} from "@modules/products/types";
import {Actions, ofActionSuccessful, Store} from "@ngxs/store";
import {ProductCreate} from "@modules/products/store/product.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-create-page',
  templateUrl: './product-create-page.component.html',
  styleUrls: ['./product-create-page.component.scss']
})
export class ProductCreatePageComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private store: Store,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.layoutService.setTitle('Create product');
  }

  createProduct(product: Product) {
    this.store.dispatch(new ProductCreate({product})).subscribe(({products: {product: {id}}}) => {
      this.router.navigate(['products', id]).then();
    });
  }

}
