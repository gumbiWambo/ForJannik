import { Component } from '@angular/core';
import { WebComponentsService } from './web-components.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  customSelector = '';
  title = 'app';
  #config!: any[]
  #index = 0
  constructor(private webComponentProvider: WebComponentsService) {
    this.webComponentProvider.getConfig().then((x) => {
      this.#config = x;
      this.changeComponent();
    });
  }

  public changeComponent() {
    this.customSelector = this.#config[this.#index % this.#config.length].selector;
    this.#index += 1;
  }
}
