import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges, SimpleChanges
} from '@angular/core';
import {Actions, ofActionSuccessful, Select, Store} from "@ngxs/store";
import {DashboardState} from "@modules/dashboard/store/dashboard.state";
import {
  EsFilter,
  EsProductFilter,
  EsProductSearchData,
  FilterOption,
  OptionsMap
} from "@modules/dashboard/types";
import {combineLatest, Observable, of} from "rxjs";
import {AttributeState} from "@modules/attributes/store/attribute.state";
import {Attribute} from "@modules/attributes/types";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {catchError, map} from "rxjs/operators";
import {UpdateProductsManually} from "@modules/dashboard/store/dashboard.actions";

@UntilDestroy()
@Component({
  selector: 'app-dashboard-product-filters',
  templateUrl: './dashboard-product-filters.component.html',
  styleUrls: ['./dashboard-product-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardProductFiltersComponent implements OnInit, OnChanges {

  @Output()
  onSearch = new EventEmitter<EsProductSearchData>();

  @Select(AttributeState.attributes)
  attributes$: Observable<Attribute[]>;

  @Select(DashboardState.filters)
  filters$: Observable<EsFilter[]>;

  @Select(DashboardState.enableFilters)
  enableFilters$: Observable<EsFilter[]>;

  form: FormGroup;
  controls: string[];

  filters: EsProductFilter[] = [];

  qtyGreaterThan4 = false;

  options: OptionsMap = {};

  updBtnLoading = false;

  isMenuOpen = false;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private store: Store,
    private actions: Actions,
  ) {
  }

  ngOnInit(): void {
    this.setForm();

    this.form.valueChanges.subscribe(() => {
      if (!this.isMenuOpen) {
        this.search();
      }
    });

    this.setFilters();

    this.actions.pipe(
      untilDestroyed(this),
      ofActionSuccessful(UpdateProductsManually),
    ).subscribe(() => {
      this.updBtnLoading = false;
      setTimeout(() => this.search(), 500);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
  }

  getFilterName(slug: string): Observable<string> {
    return this.attributes$.pipe(
      map(x => x.find(f => f.slug === slug)?.name)
    )
  }

  search() {
    const values = this.form.value;
    this.filters = Object.keys(this.form.value).reduce<EsProductFilter[]>((arr, key) => {
      if (values[key]?.length) {
        arr.push({name: key, value: values[key], type: 'attr'})
      }
      return arr;
    }, []);
    if (this.qtyGreaterThan4) {
      this.filters.push({name: 'in_stock_qty', type: 'prop', value: {gt: 4}})
    }

    this.onSearch.emit();
  }

  getFilterOptions(control: string) {
    return this.options[control];
  }

  dropFilters() {
    this.form.reset();
  }

  private setForm() {
    this.attributes$
      .pipe(
        untilDestroyed(this),
        map(x => x.filter(a => a.aggregatable))
      )
      .subscribe((attrs) => {
        const form = this.fb.group({});
        for (const attr of attrs) {
          form.registerControl(attr.slug, this.fb.control([]))
        }

        this.form = form;
        this.controls = Object.keys(form.controls);
        this.cd.detectChanges();
      });
  }

  private setFilters() {
    combineLatest<EsFilter[][], EsFilter[][]>(
      [
        this.filters$,
        this.enableFilters$
      ]
    ).pipe(
      untilDestroyed(this),
      map<[EsFilter[], EsFilter[]], OptionsMap>(([filters, enableFilters]) => {
          if (!enableFilters?.length) {
            return {};
          } else {
            return enableFilters.reduce<OptionsMap>((map, item) => {
              map[item.slug] = [...item.variants]
                .sort((a, b) => {
                  return parseFloat(a.key.toString()) - parseFloat(b.key.toString());
                })
                .map<FilterOption>(({key}) => {
                  const currFilter = filters.find(x => x.slug === item.slug)?.variants.find(v => v.key === key);
                  return {
                    label: key.toString(),
                    value: key,
                    count: currFilter?.doc_count || 0,
                    disabled: !currFilter
                  }
                }).sort((a, b) =>
                  (a.disabled === b.disabled) ? 0 : a.disabled ? 1 : -1
                );
              return map;
            }, {});
          }
        }
      ),
      catchError(err => {
        console.log('getFilterOptions ERROR', err);
        return of({});
      }),
    ).subscribe((options) => {
      this.options = options;
    });
  }

  close(e: boolean) {
    this.isMenuOpen = e;
    if (!e) {
      this.search();
    }
  }

  inStockChange(val: any) {
    this.qtyGreaterThan4 = val;
    this.search();
  }
}
