import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EsProductSearchFilters, EsRespProduct} from "@modules/dashboard/types";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = `${environment.apiUrl}/api/front/products`;

  constructor(private http: HttpClient) {
  }

  search(filters: EsProductSearchFilters): Observable<EsRespProduct> {
    return this.http.post<EsRespProduct>(`${this.url}/search`, filters);
  }
}
