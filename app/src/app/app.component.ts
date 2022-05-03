import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { WebComponentInjectorDirective } from './web-component-injector.directive';
import { WebComponentsService } from './web-components.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(WebComponentInjectorDirective) component!: WebComponentInjectorDirective;
  customSelector = '';
  title = 'app';
  #config!: any[]
  #index = 0
  #token = 'ABC';
  #url = 'XLX';
  #myToken = new Subject<string>();
  #myUrl = new Subject<string>();
  constructor(private webComponentProvider: WebComponentsService) {
    this.webComponentProvider.getConfig().then((x) => {
      this.#config = x;
      this.changeComponent();
    });
  }

  ngAfterViewInit() {
    this.initParameters();
  }

  public setToken() {
    this.#token += 'X';
    this.#myToken.next(this.#token);
  }
  public setUrl() {
    this.#url += 'Y';
    this.#myUrl.next(this.#url);
  }

  private initParameters() {
    const parameters = {
      url: this.#myToken,
      token: this.#myUrl
    };
    this.component.setParameters(parameters);
  }

  public changeComponent() {
    this.customSelector = this.#config[this.#index % this.#config.length].selector;
    this.#index += 1;
  }
}
