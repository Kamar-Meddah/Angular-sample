import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }

  public getConfig (): string {

    return 'http://localhost/' ;

  }

}
