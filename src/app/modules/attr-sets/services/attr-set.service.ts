import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Attribute} from "@modules/attributes/types";
import {AttrSet} from "@modules/attr-sets/types";

@Injectable({
  providedIn: 'root'
})
export class AttrSetService {

  private url = '/api/admin/attr_sets';

  constructor(private http: HttpClient) {
  }

  list(): Observable<AttrSet[]> {
    return this.http.get<AttrSet[]>(this.url);
  }

  get(id: number): Observable<AttrSet> {
    return this.http.get<AttrSet>(`${this.url}/${id}`);
  }

  create(data: Attribute): Observable<AttrSet> {
    return this.http.post<AttrSet>(this.url, data);
  }

  update(id: number, data: AttrSet): Observable<AttrSet> {
    return this.http.put<AttrSet>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
