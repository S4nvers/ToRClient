import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './config-model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private httpClient: HttpClient;
  private config: Configuration = new Configuration("", "", "")

  constructor( httpBackend: HttpBackend) {
     this.httpClient = new HttpClient(httpBackend)
  }

  load(url: string) {
    return new Promise<void>((resolve) => this.httpClient.get<Configuration>(url).subscribe(config => {
      this.config = config
      console.log(config)
      resolve()
    }));
  }

  getConfiguration(): Configuration {
    return this.config
  }
}
