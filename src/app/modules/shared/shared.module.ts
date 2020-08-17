import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttrSharedModule} from "@modules/attributes/shared/attr-shared.module";
import {AttrSetsSharedModule} from "@modules/attr-sets/shared/attr-set-shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AttrSharedModule,
    AttrSetsSharedModule
  ],
  exports: [
    CommonModule,
    AttrSharedModule
  ]
})
export class SharedModule {
}
