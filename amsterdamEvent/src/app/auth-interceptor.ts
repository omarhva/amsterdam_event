import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AEvents3SessionService} from './services/a-events3-session.service';
import {Injectable} from '@angular/core';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {


  constructor(private aEvents3SessionService: AEvents3SessionService) {

    console.log('HI!  AuthInterceptor works');


  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercept called');

    const token = sessionStorage.getItem('token');

    console.log('token? ' + token);

    if (token!= null) {

      const headersConfig = {
        'Authorization': 'Bearer ' + token
      };

      const cloned = req.clone({
        setHeaders: headersConfig
      });

      // using pipe(share()) to prevent multiple submissions per subscriber (observables are cold)
      // to find out more see https://blog.strongbrew.io/how-share()-can-reduce-network-requests/
      let observable = next.handle(cloned).pipe(share());

      observable.subscribe((data) => {
        // For future usage: if you want to intercept responses, this is the place :-)
        console.log('intercepting response ', data);
      }, (error) => {
        console.error('error in interceptor:',error);
      });

      return observable;

    } else {
      return next.handle(req);
    }
  }

}
