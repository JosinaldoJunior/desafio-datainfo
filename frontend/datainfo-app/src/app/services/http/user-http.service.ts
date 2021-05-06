import { Injectable } from '@angular/core';
import {Task, User} from "../../model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  private baseUrl = `${environment.api.url}/users`;

  constructor(private http: HttpClient) { }

  create(data: User): Observable<User> {
    return this.http
      .post<{data: User}>(`${this.baseUrl}`, data)
      .pipe(
        map(response => response.data)
      );
  }
}
