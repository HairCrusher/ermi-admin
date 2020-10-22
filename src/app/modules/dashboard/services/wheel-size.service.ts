import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {WSMake, WSModel, WSSearchItem, WSYear} from "@modules/dashboard/types";

@Injectable({
  providedIn: 'root'
})
export class WheelSizeService {

  private url = `${environment.apiUrl}/api/front/wheel_size`

  constructor(
    private http: HttpClient
  ) {
  }

  getMakes(): Observable<WSMake[]> {
    return this.http.get<WSMake[]>(`${this.url}/makes`);
  }

  getYears(make: string): Observable<WSYear[]> {
    return this.http.post<WSYear[]>(`${this.url}/years`, {make});
  }

  getModels(data: { make: string, year: string }): Observable<WSModel[]> {
    return this.http.post<WSModel[]>(`${this.url}/models`, data)
  }

  searchAttrs(data: { make: string, year: string, model: string }): Observable<WSSearchItem[][]> {
    return this.http.post<WSSearchItem[][]>(`${this.url}/search`, data);
  }
}
