import { Observable } from 'rxjs/Observable';

export class ServiceProvider {

  baseURL: string = 'https://gsma-hackathon-abdulsammadyousuf.c9users.io/';

  constructor() {
  }

  protected handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    return Observable.throw(error);
  }

  protected getProvider(name, payload) {
  	for(var i=0; i< payload.provider.length; i++)
  	{
  		var providername = payload.provider[i].providerName;
  		if (providername == name)
  			return payload.provider[i];
  	}
  	return null;
  }

}
