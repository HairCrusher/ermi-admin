import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttrListPageComponent } from './attr-list-page.component';

describe('AttrsListPageComponent', () => {
  let component: AttrListPageComponent;
  let fixture: ComponentFixture<AttrListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttrListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttrListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
