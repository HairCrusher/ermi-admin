import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../../environments/environment";
import {AttributeState} from "@modules/attributes/store/attribute.state";
import {AttrSetState} from "@modules/attr-sets/store/attr-set.state";

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([AttributeState, AttrSetState], {
      developmentMode: !environment.production,
    }),
  ],
  exports: [NgxsModule]
})
export class StoreModule {
}
