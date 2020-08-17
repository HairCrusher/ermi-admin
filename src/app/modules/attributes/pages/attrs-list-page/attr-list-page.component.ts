import {Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, TemplateRef} from '@angular/core';
import {Select} from "@ngxs/store";
import {AttributeState} from "@modules/attributes/store/attribute.state";
import {BehaviorSubject, Observable} from "rxjs";
import {Attribute} from "@modules/attributes/types";
import {LayoutService} from "../../../../services/layout.service";

@Component({
  selector: 'app-attrs-list-page',
  templateUrl: './attr-list-page.component.html',
  styleUrls: ['./attr-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttrListPageComponent implements OnInit, AfterViewInit {

  @ViewChild('extras') extras: TemplateRef<any>;

  @Select(AttributeState.attributes)
  attributes$: Observable<Attribute[]>;

  modalCreateShow = false;
  modalUpdateShow = false;
  attributeForUpdate$ = new BehaviorSubject<Attribute>(null);

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.layoutService.setTitle('Attributes');
    this.layoutService.setExtrasTmpl(this.extras);
  }

  onCreate(attr: Attribute) {
    this.modalCreateShow = false;
  }

  openUpdateModal(attr: Attribute) {
    this.attributeForUpdate$.next(attr);
    this.modalUpdateShow = true;
  }

  closeUpdateModal() {
    this.attributeForUpdate$.next(null);
    this.modalUpdateShow = false;
  }

}
