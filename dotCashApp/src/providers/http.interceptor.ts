import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.head(this.updateUrl(url), this.getRequestOptionArgs(options))
            .catch(errors => this.errorHandler(errors, 'head', this.updateUrl(url), null, options));
    }

    public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.options(this.updateUrl(url), this.getRequestOptionArgs(options))
            .catch(errors => this.errorHandler(errors, 'options', this.updateUrl(url), null, options));
    }

    public patch(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.patch(this.updateUrl(url), data, this.getRequestOptionArgs(options))
            .catch(errors => this.errorHandler(errors, 'patch', this.updateUrl(url), data, options));
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(this.updateUrl(url), this.getRequestOptionArgs(options))
            .catch(errors => this.errorHandler(errors, 'get', this.updateUrl(url), null, options));
    }

    public post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(this.updateUrl(url), data, this.getRequestOptionArgs(options))
            .catch(errors => this.errorHandler(errors, 'post', this.updateUrl(url), data, options));
    }

    public put(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(this.updateUrl(url), data, this.getRequestOptionArgs(options))
            .catch(errors => this.errorHandler(errors, 'put', this.updateUrl(url), data, options));
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(this.updateUrl(url), this.getRequestOptionArgs(options))
            .catch(errors => this.errorHandler(errors, 'delete', this.updateUrl(url), null, options));
    }

    private updateUrl(req: string) {
        return req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        if (options.headers.get('Content-Type') == null)
            options.headers.append('Content-Type', 'application/json');

        /*if (PreAngular.isLoggedIn() && options.headers.get('Authorization') == null) {
            options.headers.append('Authorization', 'Bearer ' + PreAngular.getAuth().access_token);
        }*/

        return options;
    }

    public refreshToken() {
        /*let formdata = "grant_type=refresh_token&refresh_token=" + PreAngular.getAuth().refresh_token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic ' + btoa(environment.clientId + ':' + environment.secret));
        return super.post(this.updateUrl("oauth/token"), formdata, { headers: headers });*/
    }

    public saveNewToken(res: any) {
        // save accessToken 
        /*console.log('HttpInterceptorService', 'Saving new token');
        let authenticationResult = res.json();
        if (authenticationResult.access_token) {
            PreAngular.refreshSession(authenticationResult);
        }
        else {
            console.log('HttpInterceptorService', 'token not found');
            return Observable.throw("Session Timeout");
        }*/
    }

    private errorHandler(err: any, method: string, url: string, data?: any, options?: RequestOptionsArgs) {
        /*if ((err.status == 0 || err.status == 401) && PreAngular.isLoggedIn()) {
            console.log("Refreshing Token");
            return this.refreshToken()
                .switchMap(
                res => {
                    let error = this.saveNewToken(res);
                    if (error) {
                        return error;
                    }
                    switch (method) {
                        case 'head':
                            return super.head(url, this.getRequestOptionArgs(options));
                        case 'options':
                            return super.options(url, this.getRequestOptionArgs(options));
                        case 'patch':
                            return super.patch(url, data, this.getRequestOptionArgs(options));
                        case 'get':
                            return super.get(url, this.getRequestOptionArgs(options));
                        case 'post':
                            return super.post(url, data, this.getRequestOptionArgs(options));
                        case 'put':
                            return super.put(url, data, this.getRequestOptionArgs(options));
                        case 'delete':
                            return super.delete(url, this.getRequestOptionArgs(options));
                    }
                    return Observable.throw(err.json());
                })
                .catch(function (err: any) {
                    PreAngular.clearAll();
                    if (window.location.href.indexOf('/#/public/login') == -1)
                        window.location.href = '/#/public/login';
                    return Observable.throw(err.json());
                });
        }
        else if ((err.status == 0 || err.status == 401) && !PreAngular.isLoggedIn()) {
            if (window.location.href.indexOf('/#/public/login') == -1)
                window.location.href = '/#/public/login';
        }*/

        return Observable.throw(err.json());
    }
}