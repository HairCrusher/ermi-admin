import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ImagesComponent} from "@modules/images/images.component";

const routes: Routes = [
  {path: '', component: ImagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule {}
