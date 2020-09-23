import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Product} from "@modules/products/types";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {ActivatedRoute, Router} from "@angular/router";
import {Select} from "@ngxs/store";
import {ProductState} from "@modules/products/store/product.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[];

  @Select(ProductState.loading)
  loading$: Observable<boolean>;

  icons = {faEdit};

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
