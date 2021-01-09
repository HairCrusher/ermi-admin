import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FetchOptions} from "../../../types";
import {environment} from "../../../../environments/environment";
import {stringifyParams} from "../../../utils/helper";
import {Observable} from "rxjs";
import {Image} from "@modules/images/types";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private url = `${environment.apiUrl}/api/admin/image`;

  constructor(private http: HttpClient) { }

  list(options: FetchOptions): Observable<{rows: Image[], count: number}> {
    const params = new HttpParams({fromObject: stringifyParams(options)});
    return this.http.get<{rows: Image[], count: number}>(this.url, {params});
  }

  upload(file: File): Observable<Image> {
    const data = new FormData();
    data.append('file', file as any);
    return this.http.post<Image>(this.url, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
