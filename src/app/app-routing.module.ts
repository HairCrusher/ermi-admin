import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultLayoutComponent} from "./layout/default-layout/default-layout.component";
import {NotFoundComponent} from "@modules/not-found/not-found.component";


const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, children: [
      {path: '', loadChildren: () => import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
      {path: 'products', loadChildren: () => import('@modules/products/products.module').then(m => m.ProductsModule)},
      {path: 'attributes', loadChildren: () => import('@modules/attributes/attributes.module').then(m => m.AttributesModule)},
      {path: 'images', loadChildren: () => import('@modules/images/images.module').then(m => m.ImagesModule)},
    ]
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
