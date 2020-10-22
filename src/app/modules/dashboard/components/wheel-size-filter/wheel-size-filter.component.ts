import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {WheelSizeService} from "@modules/dashboard/services/wheel-size.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {NzNotificationService, NzSelectOptionInterface} from "ng-zorro-antd";
import {filter, map, startWith, switchMap, tap} from "rxjs/operators";
import {WSMake} from "@modules/dashboard/types";
import {BehaviorSubject, Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../../../environments/environment";

@UntilDestroy()
@Component({
  selector: 'app-wheel-size-filter',
  templateUrl: './wheel-size-filter.component.html',
  styleUrls: ['./wheel-size-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WheelSizeFilterComponent implements OnInit {

  @Output() onSearch = new EventEmitter();

  makes$: Observable<NzSelectOptionInterface[]> = this.WSService.getMakes()
    .pipe(
      startWith([]),
      map<WSMake[], NzSelectOptionInterface[]>((x) =>
        x.map(m => ({label: m.name, value: m.slug})))
    );

  years$ = new BehaviorSubject<NzSelectOptionInterface[]>([]);
  models$ = new BehaviorSubject<NzSelectOptionInterface[]>([]);

  form = this.fb.group({
    make: [null, Validators.required],
    year: [{value: null, disabled: true}, Validators.required],
    model: [{value: null, disabled: true}, Validators.required]
  });

  private make = this.form.get('make');
  private year = this.form.get('year');
  private model = this.form.get('model');

  loading$ = new BehaviorSubject(false);

  isSettingCookie = false;

  constructor(
    private fb: FormBuilder,
    private WSService: WheelSizeService,
    private cookie: CookieService,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit(): void {
    const cookie = this.cookie.get(environment.wheelSizeCookieName);

    if (cookie) {
      const {make, year, model} = JSON.parse(cookie).filters;
      this.isSettingCookie = true;
      this.WSService.getYears(make).pipe(
        untilDestroyed(this),
        tap(years => {
          this.years$.next(years.map(({name, slug}) =>
            ({label: name.toString(), value: slug})));
          this.year.enable();
          this.loading$.next(true);
        }),
        switchMap(() => this.WSService.getModels({
          year,
          make
        }))
      ).subscribe((models) => {
        this.models$.next(models.map(({name, slug}) =>
          ({label: name, value: slug})));
        this.model.enable();
        this.form.patchValue({make, year, model});
        this.isSettingCookie = false;
        this.loading$.next(false);
      });
    }

    this.make.valueChanges.pipe(
      untilDestroyed(this),
      filter(() => !this.isSettingCookie),
      tap(() => {
        this.year.setValue(null);
        this.year.disable();
        this.years$.next([]);
      }),
      filter(m => !!m),
      tap(() => this.loading$.next(true)),
      switchMap(make => this.WSService.getYears(make))
    ).subscribe((years) => {
        this.years$.next(years.map(({name, slug}) =>
          ({label: name.toString(), value: slug})));
        this.year.enable();
        this.loading$.next(false);
      }
    );

    this.year.valueChanges.pipe(
      untilDestroyed(this),
      filter(() => !this.isSettingCookie),
      tap(() => {
        this.model.setValue(null);
        this.model.disable();
        this.models$.next([]);
      }),
      filter(val => !!val),
      tap(() => this.loading$.next(true)),
      switchMap(year => this.WSService.getModels({
        year,
        make: this.make.value
      }))
    ).subscribe((models) => {
      this.models$.next(models.map(({name, slug}) =>
        ({label: name, value: slug})));
      this.model.enable();
      this.loading$.next(false);
    });
  }

  search() {
    if (this.form.valid) {
      this.loading$.next(true);
      this.WSService.searchAttrs(this.form.value).subscribe(
        data => {
          if (!data.length || !data[0].length) {
            this.notification.error('Ошибка', 'По данному фильтру отсутствует информация');
          } else {
            this.cookie.set(environment.wheelSizeCookieName, JSON.stringify({
              filters: this.form.value,
              data
            }));
            this.onSearch.emit();
          }
          this.loading$.next(false);
        },
        error => {
          console.log('ERROR', error);
          this.loading$.next(false);
        });
    } else {
      console.log('ERROR: form not valid', this.form.value);
      this.loading$.next(false);
    }
  }

  dropModelFilter() {
    this.make.setValue(null);
    this.cookie.delete(environment.wheelSizeCookieName);
    this.onSearch.emit();
  }

}
