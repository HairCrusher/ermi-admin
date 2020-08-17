import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultLayoutComponent} from "./layout/default-layout/default-layout.component";
import {NotFoundComponent} from "./not-found/not-found.component";


const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, children: [
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      {path: 'products', loadChildren: () => import('@modules/products/products.module').then(m => m.ProductsModule)},
      {path: 'attributes', loadChildren: () => import('@modules/attributes/attributes.module').then(m => m.AttributesModule)},
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
