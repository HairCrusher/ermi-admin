import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Attribute} from "@modules/attributes/types";
import {faEdit, faTrashAlt, faPlusSquare} from "@fortawesome/free-regular-svg-icons";
import {Router} from "@angular/router";
import {NzModalService, NzNotificationService} from "ng-zorro-antd";
import {Store} from "@ngxs/store";
import {AttributeDelete} from "@modules/attributes/store/attribute.actions";

@Component({
  selector: 'app-attr-list',
  templateUrl: './attr-list.component.html',
  styleUrls: ['./attr-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttrListComponent implements OnInit {

  @Input() attributes: Attribute[];
  @Input() showActions = true;

  @Output() rowClickEvent = new EventEmitter<Attribute>();

  icons = {faEdit, faTrashAlt, faPlusSquare};

  constructor(
    private modalService: NzModalService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  rowClick(attr: Attribute) {
    this.rowClickEvent.emit(attr);
  }

  edit(attr: Attribute) {

  }

  delete({id}: Attribute) {
    this.modalService.confirm({
      nzTitle: 'Confirmation',
      nzContent: 'Are you sure you want to remove the attribute?',
      nzOnOk: () => this.store.dispatch(new AttributeDelete({id}))
    })
  }
}
