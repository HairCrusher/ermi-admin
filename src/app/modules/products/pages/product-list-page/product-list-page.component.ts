import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LayoutService} from "../../../../services/layout.service";
import {Store} from "@ngxs/store";
import {ProductFetch} from "@modules/products/store/product.actions";
import {NzTableQueryParams} from "ng-zorro-antd";

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit, AfterViewInit {

  @ViewChild('extras') extras: TemplateRef<any>;

  constructor(
    private layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    this.layoutService.setTitle('Products');
  }

  ngAfterViewInit(): void {
    this.layoutService.setExtrasTmpl(this.extras);
  }
}
