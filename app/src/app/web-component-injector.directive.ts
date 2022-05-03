import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { WebComponentsService } from './web-components.service';

@Directive({
  selector: '[appWebComponentInjector]'
})
export class WebComponentInjectorDirective {

  #lastScript!: any;
  #componentElement!: any;
  #component = '';
  #scriptSources: string[] = [];
  public parameters = new Subject();

  @Input()
  set component(value: string) {
    this.#component = value;
    if(this.#component) {
      this.injectComponent()
    }
  };
  constructor(private scriptProvider: WebComponentsService, private renderer: Renderer2, private element: ElementRef) {
    this.parameters.subscribe(x => this.setParameters(x));
  }

  private injectComponent() {
    this.cleanUp();
    this.scriptProvider.getScript(this.#component).then(scriptSource => {
      this.#lastScript = this.renderer.createElement('script');
      if(!this.#scriptSources.includes(scriptSource)) {
        this.#lastScript.src = scriptSource;
        this.renderer.appendChild(document.querySelector('body'), this.#lastScript);
        this.#scriptSources.push(scriptSource);
      }
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
  private setParameters(parameters: any) {
    if (this.#componentElement) {
      for(const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          this.#componentElement[key] = parameters[key];
        }
      }
    }
  }
}
