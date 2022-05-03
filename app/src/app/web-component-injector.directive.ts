import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { WebComponentsService } from './web-components.service';

@Directive({
  selector: '[appWebComponentInjector]'
})
export class WebComponentInjectorDirective {

  #lastScript = '';
  #component = '';

  @Input()
  set component(value: string) {
    this.#component = value;
    this.injectComponent()
  };
  constructor(private scriptProvider: WebComponentsService, private renderer: Renderer2, private element: ElementRef) { }

  private injectComponent() {
    this.scriptProvider.getScript(this.#component).then(scriptSource => {
      const script = this.renderer.createElement('script');
      script.src = scriptSource;
      this.renderer.appendChild(document.querySelector('body'), script);
      const dialog = this.renderer.createElement(this.#component);
      this.renderer.appendChild(this.element.nativeElement, dialog);
      debugger;
    });
  }
}
