import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { WebComponentsService } from './web-components.service';

@Directive({
  selector: '[appWebComponentInjector]'
})
export class WebComponentInjectorDirective {

  #lastScript!: any;
  #componentElement!: any;
  #component = '';

  @Input()
  set component(value: string) {
    this.#component = value;
    this.injectComponent()
  };
  constructor(private scriptProvider: WebComponentsService, private renderer: Renderer2, private element: ElementRef) { }

  private injectComponent() {
    this.cleanUp();
    this.scriptProvider.getScript(this.#component).then(scriptSource => {
      this.#lastScript = this.renderer.createElement('script');
      this.#lastScript.src = scriptSource;
      this.renderer.appendChild(document.querySelector('body'), this.#lastScript);
      this.#componentElement = this.renderer.createElement(this.#component);
      this.renderer.appendChild(this.element.nativeElement, this.#componentElement);
    });
  }

  private cleanUp() {
    if(this.#lastScript) {
      this.#lastScript.remove();
    }
    if(this.#componentElement) {
      this.#componentElement.remove();
    }
  }
}
