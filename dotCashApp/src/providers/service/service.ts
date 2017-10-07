import { Observable } from 'rxjs/Observable';

export class ServiceProvider {

  baseURL: string = 'https://gsma-hackathon-abdulsammadyousuf.c9users.io/';

  constructor() {
  }

  protected handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    return Observable.throw(error);
  }

}
