import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL} from '../tokens/api-url.token';

export interface Category {
  id: number;
  name: string;
  isActive: boolean;
}

@Injectable({providedIn: 'root'})
export class CategoriasApiService {
  private readonly http = inject(HttpClient);
  private readonly url = `${inject(API_URL)}/categories`;

  list(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  create(name: string): Observable<Category> {
    return this.http.post<Category>(this.url, {name: name.trim()});
  }

  update(id: number, name: string): Observable<Category> {
    return this.http.patch<Category>(`${this.url}/${id}`, {name: name.trim()});
  }
}
