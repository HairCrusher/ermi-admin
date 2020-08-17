import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttrListComponent} from './components/attr-list/attr-list.component';
import {AttrSingleComponent} from './components/attr-single/attr-single.component';
import {AttrListPageComponent} from './pages/attrs-list-page/attr-list-page.component';
import {AttrsRoutingModule} from "@modules/attributes/attrs-routing.module";
import {
  NzButtonModule,
  NzFormModule, NzInputModule,
  NzModalModule,
  NzModalService,
  NzNotificationModule, NzSelectModule,
  NzTableModule
} from "ng-zorro-antd";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { AttrSingleModalComponent } from './components/attr-single-modal/attr-single-modal.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [AttrListComponent, AttrSingleComponent, AttrListPageComponent, AttrSingleModalComponent],
  imports: [
    CommonModule,
    AttrsRoutingModule,
    NzTableModule,
    FontAwesomeModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule
  ]
})
export class AttributesModule {
}
