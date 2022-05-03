import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import LocaleDE from '@angular/common/locales/de'
import LocaleEN from '@angular/common/locales/en'

import { AppComponent } from './app.component';
import { CoolerDialogComponent } from './cooler-dialog/cooler-dialog.component';
import { registerLocaleData } from '@angular/common';
import { DoperDialogComponent } from './doper-dialog/doper-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CoolerDialogComponent,
    DoperDialogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})
export class AppModule {
  constructor(private injector: Injector) {
    this.registerLanguages();
  }
  ngDoBootstrap() :void {
    customElements.define('g-cooler-dialog', createCustomElement(CoolerDialogComponent, {injector: this.injector}));
    customElements.define('g-doper-dialog', createCustomElement(DoperDialogComponent, {injector: this.injector}));
  }
  /**
   * For Angular Localization
   */
  registerLanguages() {
    registerLocaleData(LocaleDE);
    registerLocaleData(LocaleEN);
  }
}
