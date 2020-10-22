import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {Select, Selector} from "@ngxs/store";
import {DashboardState} from "@modules/dashboard/store/dashboard.state";
import {
  EsFilter,
  EsProductFilter,
  EsProductSearchData,
  Filter,
  FilterOption,
  OptionsMap
} from "@modules/dashboard/types";
import {combineLatest, forkJoin, Observable, of} from "rxjs";
import {AttributeState} from "@modules/attributes/store/attribute.state";
import {Attribute} from "@modules/attributes/types";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {catchError, distinct, distinctUntilChanged, filter, map, startWith} from "rxjs/operators";
import {NzSelectOptionInterface} from "ng-zorro-antd";

@UntilDestroy()
@Component({
  selector: 'app-dashboard-product-filters',
  templateUrl: './dashboard-product-filters.component.html',
  styleUrls: ['./dashboard-product-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardProductFiltersComponent implements OnInit {

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

  options: OptionsMap = {};

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.setForm();

    // this.form.valueChanges.subscribe(() => this.search());

    this.setFilters();
  }

  getFilterName(slug: string): Observable<string> {
    return this.attributes$.pipe(
      map(x => x.find(f => f.slug === slug)?.name)
    )
  }

  search() {
    const values = this.form.value;
    this.filters = Object.keys(this.form.value).reduce<Filter[]>((arr, key) => {
      if (values[key]?.length) {
        arr.push({name: key, value: values[key]})
      }
      return arr;
    }, []);

    this.onSearch.emit();
  }

  getFilterOptions(control: string) {
    return this.options[control];
  }

  dropFilters() {
    this.form.reset();
    this.search();
  }

  private setForm() {
    this.attributes$
      .pipe(untilDestroyed(this))
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
                .sort((a, b) => parseFloat(a.key.toString()) - parseFloat(b.key.toString()))
                .map<FilterOption>(({key}) => {
                  const currFilter = filters.find(x => x.slug === item.slug)?.variants.find(v => v.key === key);
                  return {
                    label: key.toString(),
                    value: key,
                    count: currFilter?.doc_count || 0,
                    disabled: !currFilter
                  }
                });
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
}
