import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-attr-single',
  templateUrl: './attr-single.component.html',
  styleUrls: ['./attr-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttrSingleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
