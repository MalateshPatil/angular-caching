import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { map, Observable, of, share, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptorService implements HttpInterceptor {

  constructor() { }

  private cache = new Map()
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== "GET") {
      return next.handle(req)
    }
    let result = this.cache.get(req.url);
    if (result) {
      const cachedResponse: HttpResponse<any> = result.response;
      const setDate: Date = result.date;
      var dt = new Date();
      if (dt.getMilliseconds() - setDate.getTime() > 15000) {
        this.cache.delete(req.url);
        return next.handle(req).pipe(
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.cache.set(req.url, { response: event.clone(), date: new Date() });
            }
          })
        )
      }
      else {
        return of(cachedResponse.clone());
      }
    }
    else {
      return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.cache.set(req.url, { response: event.clone(), date: new Date() });
          }
        })
      )
    }
  }
}
