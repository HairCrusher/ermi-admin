import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {WheelSizeService} from "@modules/dashboard/services/wheel-size.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {NzNotificationService, NzSelectOptionInterface} from "ng-zorro-antd";
import {filter, map, startWith, switchMap, tap} from "rxjs/operators";
import {WSMake} from "@modules/dashboard/types";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {LocalStorageService} from "ngx-localstorage";

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
  generations$ = new BehaviorSubject<NzSelectOptionInterface[]>([]);
  trims$ = new BehaviorSubject<NzSelectOptionInterface[]>([]);
  pairs$ = new BehaviorSubject<NzSelectOptionInterface[]>([]);

  form = this.fb.group({
    make: [null, Validators.required],
    year: [{value: null, disabled: true}, Validators.required],
    model: [{value: null, disabled: true}, Validators.required],
    generation: [{value: null, disabled: true}, Validators.required],
    trim: [{value: null, disabled: true}, Validators.required],
    pair: [{value: null, disabled: true}, Validators.required]
  });

  private make = this.form.get('make');
  private year = this.form.get('year');
  private model = this.form.get('model');
  private generation = this.form.get('generation');
  private trim = this.form.get('trim');
  private pair = this.form.get('pair');

  loading$ = new BehaviorSubject(false);

  isSettingCookie = false;

  constructor(
    private fb: FormBuilder,
    private WSService: WheelSizeService,
    private notification: NzNotificationService,
    private localStorage: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    const localStorage = this.localStorage.get(environment.wheelSizeCookieName);

    if (localStorage) {
      this.setDataFromLocalStorage(localStorage);
    }

    this.setFormWatchers();
  }

  search() {
    const data = JSON.parse(this.pair.value);
    this.localStorage.set(environment.wheelSizeCookieName, {
      filters: this.form.value,
      data
    });
    this.onSearch.emit();
  }

  dropModelFilter() {
    this.make.setValue(null);
    this.localStorage.remove(environment.wheelSizeCookieName);
    this.onSearch.emit();
  }

  private setFormWatchers() {
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

    this.model.valueChanges.pipe(
      untilDestroyed(this),
      filter(() => !this.isSettingCookie),
      tap(() => {
        this.generation.setValue(null);
        this.generation.disable();
        this.generations$.next([]);
      }),
      filter(val => !!val),
      tap(() => this.loading$.next(true)),
      switchMap(model => this.WSService.getGenerations({
        make: this.make.value,
        year: this.year.value,
        model
      }))
    ).subscribe((generations) => {
      this.generations$.next(generations.map((gen) =>
        ({label: gen, value: gen})));
      this.generation.enable();
      this.loading$.next(false);
    });

    this.generation.valueChanges.pipe(
      untilDestroyed(this),
      filter(() => !this.isSettingCookie),
      tap(() => {
        this.trim.setValue(null);
        this.trim.disable();
        this.trims$.next([]);
      }),
      filter(val => !!val),
      tap(() => this.loading$.next(true)),
      switchMap(generation => this.WSService.getTrims({
        make: this.make.value,
        year: this.year.value,
        model: this.model.value,
        generation
      }))
    ).subscribe((trims) => {
      this.trims$.next(trims.map((trim) =>
        ({label: trim, value: trim})));
      this.trim.enable();
      this.loading$.next(false);
    });

    this.trim.valueChanges.pipe(
      untilDestroyed(this),
      filter(() => !this.isSettingCookie),
      tap(() => {
        this.pair.setValue(null);
        this.pair.disable();
        this.pairs$.next([]);
      }),
      filter(val => !!val),
      tap(() => this.loading$.next(true)),
      switchMap(trim => this.WSService.searchAttrs({
        make: this.make.value,
        year: this.year.value,
        model: this.model.value,
        generation: this.generation.value,
        trim
      }))
    ).subscribe((pairs) => {
      this.pairs$.next(pairs.map(pair => ({
        value: JSON.stringify(pair.esFilters),
        label: `D${pair.diameter} W${pair.width} ET${pair.et} ${pair.boltsCount}x${pair.boltsSpacing}`
      })));
      this.pair.enable();
      this.loading$.next(false);
    });
  }

  private setDataFromLocalStorage(cookie: { filters: any }) {
    const {make, year, model, generation, trim, pair} = cookie.filters;
    this.isSettingCookie = true;
    this.WSService.getYears(make).pipe(
      tap(years => {
        this.loading$.next(true);
        this.years$.next(years.map(({name, slug}) =>
          ({label: name.toString(), value: slug})));
        this.year.enable();
      }),
      switchMap(() => this.WSService.getModels({
        year,
        make
      })),
      tap(models => {
        this.models$.next(models.map(({name, slug}) =>
          ({label: name, value: slug})));
        this.model.enable();
      }),
      switchMap(() => this.WSService.getGenerations({
        year,
        make,
        model
      })),
      tap(gens => {
        this.generations$.next(gens.map(gen =>
          ({label: gen, value: gen})
        ));
        this.generation.enable();
      }),
      switchMap(() => this.WSService.getTrims({
        year,
        make,
        model,
        generation
      })),
      tap(trims => {
        this.trims$.next(trims.map(trim =>
          ({label: trim, value: trim})));
        this.trim.enable();
      }),
      switchMap(() => this.WSService.searchAttrs({
        year,
        make,
        model,
        generation,
        trim
      }))
    ).subscribe((pairs) => {
      this.pairs$.next(pairs.map(p => ({
        value: JSON.stringify(p.esFilters),
        label: `D${p.diameter} W${p.width} ET${p.et} ${p.boltsCount}x${p.boltsSpacing}`
      })));
      this.pair.enable();

      this.form.patchValue({make, year, model, generation, trim, pair});
      this.isSettingCookie = false;
      this.loading$.next(false);
    });
  }
}
