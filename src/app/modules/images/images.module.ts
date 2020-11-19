import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ImagesComponent } from './images.component';
import {ImagesRoutingModule} from "@modules/images/images-routing.module";
import {NgxsModule} from "@ngxs/store";
import {ImagesState} from "@modules/images/store/images.state";
import { ImageCardComponent } from './components/image-card/image-card.component';
import {
  NzButtonModule,
  NzCardModule, NzCheckboxModule, NzFormModule,
  NzGridModule,
  NzIconModule, NzInputModule,
  NzListModule, NzModalModule,
  NzPaginationModule, NzUploadModule
} from "ng-zorro-antd";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [ImageViewComponent, ImageUploadComponent, ImageListComponent, ImagesComponent, ImageCardComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    NgxsModule.forFeature([ImagesState]),
    NzGridModule,
    NzCardModule,
    NzListModule,
    NzPaginationModule,
    NzButtonModule,
    NzIconModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzUploadModule,
    NzModalModule,
    NzCheckboxModule,
  ]
})
export class ImagesModule { }
