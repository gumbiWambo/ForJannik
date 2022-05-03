import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebComponentsService {

  #http: HttpClient;
  #configLoaded!: Promise<any>;
  #config: {selector: string, scriptName: string}[] = [];
  #url = 'http://localhost:1337/';

  constructor(http: HttpClient) {
    this.#http = http;
    this.getConfig();
  }

  async getScript(selector: string): Promise<string> {
    await this.#configLoaded;
    console.log(this.#config)
    const entry = this.#config.find(x => x.selector === selector);
    const scriptName = entry?.scriptName;
    if (scriptName) {
      return this.#url + 'script/' + scriptName;
    }
    return '';
  }

  private getConfig() {
    this.#configLoaded = firstValueFrom(this.#http.get<{selector: string, scriptName: string}[]>(this.#url + 'components')).then(config => this.#config = config);
  }
}
