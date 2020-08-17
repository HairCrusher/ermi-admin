import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListPageComponent} from "@modules/products/pages/product-list-page/product-list-page.component";
import {ProductCreatePageComponent} from "@modules/products/pages/product-create-page/product-create-page.component";
import {ProductSinglePageComponent} from "@modules/products/pages/product-single-page/product-single-page.component";


const routes: Routes = [
  {path: '', component: ProductListPageComponent},
  {path: 'create', component: ProductCreatePageComponent},
  {path: ':id', component: ProductSinglePageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
