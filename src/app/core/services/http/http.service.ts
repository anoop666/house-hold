import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public apiUrl: string = environment.baseUrl  + environment.apiVersion;

  constructor(
    private http: HttpClient) { }

  post(url: string, data: any = {}, prop:boolean = false): Observable<any | any[]> {
    return this.http.post((prop ?  environment.baseUrl : this.apiUrl)  + url, data);
  }


  put(url: string, data: any = {}, prop:boolean = false): Observable<any | any[]> {
    return this.http.put((prop ?  environment.baseUrl : this.apiUrl) + url, data);
  }

  patch(url: string, data: any = {}, prop:boolean = false): Observable<any | any[]> {
    return this.http.patch((prop ?  environment.baseUrl : this.apiUrl) + url, data);
  }

  get(url: string, prop:boolean = false): Observable<any | any[]> {
    return this.http.get((prop ?  environment.baseUrl : this.apiUrl) + url);
  }

  delete(url: string, prop:boolean = false): Observable<any | any[]> {
    return this.http.delete((prop ?  environment.baseUrl : this.apiUrl) + url);
  }
}
