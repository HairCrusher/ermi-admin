import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Product} from "@modules/products/types";
import {Injectable} from "@angular/core";
import {stringifyParams} from "../../../utils/helper";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {

  private url = `${environment.apiUrl}/api/admin/products`;

  constructor(private http: HttpClient) {
  }

  list(options = {}): Observable<{rows: Product[], count: number}> {
    const params = new HttpParams({fromObject: stringifyParams(options)});
    return this.http.get<{rows: Product[], count: number}>(this.url, {params});
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  create(data: Product): Observable<Product> {
    return this.http.post<Product>(this.url, data);
  }

  update(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
