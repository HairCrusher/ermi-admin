import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttributeService} from "@modules/attributes/services/attribute.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [AttributeService],
  exports: [
    CommonModule,
  ]
})
export class AttrSharedModule { }
