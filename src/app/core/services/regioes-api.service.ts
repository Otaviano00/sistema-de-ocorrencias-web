import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

export interface RecognizedRegion {
  providerId: string;
  name: string;
  municipality: string | null;
  state: string | null;
}

export interface ManagedRegion extends RecognizedRegion {
  id: number;
  isActive: boolean;
}

@Injectable({providedIn: 'root'})
export class RegioesApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/regions';

  list() {
    return this.http.get<ManagedRegion[]>(this.baseUrl);
  }

  search(query: string) {
    const params = new HttpParams().set('q', query);
    return this.http.get<RecognizedRegion[]>(`${this.baseUrl}/search`, {
      params,
    });
  }

  activate(region: RecognizedRegion) {
    return this.http.post<ManagedRegion>(this.baseUrl, region);
  }

  deactivate(id: number) {
    return this.http.patch<ManagedRegion>(`${this.baseUrl}/${id}`, {
      isActive: false,
    });
  }

  reactivate(id: number) {
    return this.http.patch<ManagedRegion>(`${this.baseUrl}/${id}`, {
      isActive: true,
    });
  }
}
