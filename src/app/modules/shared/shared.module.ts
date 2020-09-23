import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzModalModule, NzNotificationModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzNotificationModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    NzNotificationModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
