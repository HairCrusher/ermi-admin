import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private headerExtrasTmpl = new BehaviorSubject<TemplateRef<any>>(null);
  headerExtrasTmpl$ = this.headerExtrasTmpl.asObservable();

  private pageTitle = new BehaviorSubject<string>(null);
  pageTitle$ = this.pageTitle.asObservable();

  constructor() {
  }

  setExtrasTmpl(tmpl: TemplateRef<any>) {
    this.headerExtrasTmpl.next(tmpl);
  }

  setTitle(title: string) {
    this.pageTitle.next(title);
  }
}
