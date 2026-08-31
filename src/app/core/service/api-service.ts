import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<TResponse>(baseUrl: string, route: string): Observable<TResponse> {
    return this.http.get<TResponse>(`${baseUrl}/${route}`);
  }

  post<TRequest, TResponse>(baseUrl: string, route: string, data: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(`${baseUrl}/${route}`, data);
  }

  put<TRequest, TResponse>(baseUrl: string, route: string, data: TRequest): Observable<TResponse> {
    return this.http.put<TResponse>(`${baseUrl}/${route}`, data);
  }

  delete(baseUrl: string, route: string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${route}`);
  }
}
