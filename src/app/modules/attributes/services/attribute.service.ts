import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Attribute, AttrType} from "@modules/attributes/types";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private url = `${environment.apiUrl}/api/admin/attrs`;

  constructor(private http: HttpClient) {
  }

  list(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(this.url);
  }

  getTypes(): Observable<AttrType[]> {
    return this.http.get<AttrType[]>(`${environment.apiUrl}/api/admin/attr_types`);
  }

  get(id: number): Observable<Attribute> {
    return this.http.get<Attribute>(`${this.url}/${id}`);
  }

  create(data: Attribute): Observable<Attribute> {
    return this.http.post<Attribute>(this.url, data);
  }

  update(id: number, data: Attribute): Observable<Attribute> {
    return this.http.put<Attribute>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
