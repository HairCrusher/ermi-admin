import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LayoutService} from "../../../../services/layout.service";
import {Actions, ofActionSuccessful, Select, Store} from "@ngxs/store";
import {ProductState} from "@modules/products/store/product.state";
import {Observable} from "rxjs";
import {Product} from "@modules/products/types";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductDelete, ProductEdit, ProductGet} from "@modules/products/store/product.actions";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {NzNotificationService} from "ng-zorro-antd";

@UntilDestroy()
@Component({
  selector: 'app-product-single-page',
  templateUrl: './product-single-page.component.html',
  styleUrls: ['./product-single-page.component.scss']
})
export class ProductSinglePageComponent implements OnInit, AfterViewInit {

  @ViewChild('extras') extras: TemplateRef<any>;

  @Select(ProductState.product)
  product$: Observable<Product>;

  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private actions: Actions,
    private notice: NzNotificationService
  ) {
  }

  ngOnInit(): void {
    this.actions.pipe(
      untilDestroyed(this),
      ofActionSuccessful(ProductEdit)
    ).subscribe(() => {
      this.notice.success('Succes', 'Product successfully updated');
    });

    const params = this.route.snapshot.params;
    const id = parseInt(params.id);
    if (!isNaN(id)) {
      this.store.dispatch(new ProductGet({id}));
    } else {
      this.router.navigate(['404']).then();
    }
    this.layoutService.setTitle('Product');
  }

  ngAfterViewInit(): void {
  }

  delete(id: number) {
    this.store.dispatch(new ProductDelete({id})).subscribe(() => {
      this.router.navigate(['products']).then();
    });
  }

  update(product: Product) {
    this.store.dispatch(new ProductEdit({product}));
  }
}
