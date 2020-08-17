import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttrSetService} from "@modules/attr-sets/services/attr-set.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AttrSetService],
  exports: [
    CommonModule,
  ]
})
export class AttrSetsSharedModule { }
