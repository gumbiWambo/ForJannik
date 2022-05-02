import { Directive, Input, Renderer2 } from '@angular/core';
import { WebComponentsService } from './web-components.service';

@Directive({
  selector: '[appWebComponentInjector]'
})
export class WebComponentInjectorDirective {

  #lastScript = ''

  @Input()
  public component = '';
  constructor(private scriptProvider: WebComponentsService, private renderer: Renderer2) { }

  ngOnInit() {
    console.log(this.component);
  }
  private injectComponent() {
    this.scriptProvider.getScript(this.component);
  }
}
