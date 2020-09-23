import {NgModule} from '@angular/core';
import {SharedModule} from "@modules/shared/shared.module";
import {ProductListPageComponent} from './pages/product-list-page/product-list-page.component';
import {ProductSinglePageComponent} from './pages/product-single-page/product-single-page.component';
import {ProductCreatePageComponent} from './pages/product-create-page/product-create-page.component';
import {ProductsRoutingModule} from "@modules/products/products-routing.module";
import {ProductListComponent} from './components/product-list/product-list.component';
import {
  NzButtonModule,
  NzCardModule,
  NzCollapseModule,
  NzFormModule, NzIconModule,
  NzInputModule,
  NzListModule, NzModalModule, NzSelectModule, NzSwitchModule,
  NzTableModule, NzTypographyModule
} from "ng-zorro-antd";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxsModule} from "@ngxs/store";
import {ProductState} from "@modules/products/store/product.state";
import {ProductSingleComponent} from './components/product-single/product-single.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductAttrModalComponent} from './components/product-attr-modal/product-attr-modal.component';


@NgModule({
  declarations: [
    ProductListPageComponent,
    ProductSinglePageComponent,
    ProductCreatePageComponent,
    ProductListComponent,
    ProductSingleComponent,
    ProductAttrModalComponent
  ],
  imports: [
    SharedModule,
    NgxsModule.forFeature([ProductState]),
    ProductsRoutingModule,
    NzListModule,
    NzTableModule,
    NzButtonModule,
    FontAwesomeModule,
    NzCardModule,
    NzCollapseModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzSelectModule,
    NzTypographyModule
  ],
})
export class ProductsModule {
}
