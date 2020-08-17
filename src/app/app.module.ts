import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "@modules/shared/shared.module";
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {DefaultLayoutComponent} from './layout/default-layout/default-layout.component';
import {NzButtonModule, NzIconModule, NzLayoutModule, NzMenuModule, NzPageHeaderModule} from "ng-zorro-antd";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StoreModule} from "./store/store.module";
import { NotFoundComponent } from './not-found/not-found.component';
import {AttrSharedModule} from "@modules/attributes/shared/attr-shared.module";
import { SidebarComponent } from './components/sidebar/sidebar.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    NotFoundComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    FontAwesomeModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzMenuModule,
    NzIconModule,
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {}
