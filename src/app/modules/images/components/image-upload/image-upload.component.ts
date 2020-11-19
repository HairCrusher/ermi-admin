import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {NzUploadFile, NzUploadXHRArgs} from "ng-zorro-antd";
import {getBase64} from "../../../../utils/helper";
import {environment} from "../../../../../environments/environment";
import {Observable, Subscription} from "rxjs";
import {ImagesService} from "@modules/images/services/images.service";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploadComponent implements OnInit {

  // TODO update list after upload, realise delete and download

  @Output() uploadSuccessEvent = new EventEmitter();

  fileList: NzUploadFile[] = []

  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(
    private imagesService: ImagesService
  ) {
  }

  ngOnInit(): void {
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  uploadFile(): Function {
    const fn = (args: NzUploadXHRArgs): Subscription => {

      return this.imagesService.upload(args.file as any).subscribe(
        file => {
          args.onSuccess(null, args.file, null);
          this.uploadSuccessEvent.emit();
        },
        err => {
          console.log('uploadFile ERROR', err);
        }
      );
    }

    return fn.bind(this);
  }
}
