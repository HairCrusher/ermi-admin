import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {LayoutService} from "../../services/layout.service";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
  ) {}

  ngOnInit(): void {
    this.layoutService.setTitle('Images');
  }

}
