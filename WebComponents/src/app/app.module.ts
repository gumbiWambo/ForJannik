import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import LocaleDE from '@angular/common/locales/de'
import LocaleEN from '@angular/common/locales/en'

import { AppComponent } from './app.component';
import { CoolerDialogComponent } from './cooler-dialog/cooler-dialog.component';
import { registerLocaleData } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CoolerDialogComponent
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
  }
  /**
   * For Angular Localization
   */
  registerLanguages() {
    registerLocaleData(LocaleDE);
    registerLocaleData(LocaleEN);
  }
}
