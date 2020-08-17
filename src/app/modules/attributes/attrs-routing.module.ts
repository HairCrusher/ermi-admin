import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AttrListPageComponent} from "@modules/attributes/pages/attrs-list-page/attr-list-page.component";


const routes: Routes = [
  {path: '', component: AttrListPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttrsRoutingModule {
}
