import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {faCaretSquareLeft} from "@fortawesome/free-regular-svg-icons";
import {filter, tap} from "rxjs/operators";
import {LayoutService} from "../../services/layout.service";
import {NavigationStart, Router} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultLayoutComponent implements OnInit {

  extras$ = this.layoutService.headerExtrasTmpl$.pipe(tap(() => setTimeout(() => this.cd.detectChanges(), 0)));
  title$ = this.layoutService.pageTitle$;

  constructor(
    private layoutService: LayoutService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(x => x instanceof NavigationStart))
      .subscribe(() => this.layoutService.setExtrasTmpl(null));
  }

  back() {
    this.location.back();
  }
}
