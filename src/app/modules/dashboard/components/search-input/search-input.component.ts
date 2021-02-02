import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import {FormBuilder} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent implements OnInit {

  readonly faSearch = faSearch;

  @Output() onTextChange = new EventEmitter();

  form = this.fb.group({
    searchString: null
  });

  get searchString() {
    return this.form.get('searchString').value;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.onTextChange.emit());
  }

}
