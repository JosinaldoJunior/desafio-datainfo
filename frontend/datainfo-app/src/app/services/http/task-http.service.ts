import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Task} from "../../model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {

  private baseUrl = `${environment.api.url}/todo-lists`;

  constructor(private http: HttpClient) { }

  list(searchText, userId): Observable<{data: Array<Task>, meta: any}>{
    // tslint:disable-next-line:max-line-length
    return this.http.get<{data: Array<Task>, meta: any}>
      // tslint:disable-next-line:max-line-length
      (`${this.baseUrl}?userId=${userId}${searchText}`);
  }

  get(taskId: number) : Observable<Task> {
    return this.http
      .get<{data: Task}>(`${this.baseUrl}/${taskId}`)
      .pipe(
        map(response => response.data)
      );
  }

  create(data: Task): Observable<Task> {
    return this.http
      .post<{data: Task}>(`${this.baseUrl}`, data)
      .pipe(
          map(response => response.data)
      );
  }

  update(taskId: number, task: Task): Observable<Task> {
    return this.http
      .put<{data: Task}>(`${this.baseUrl}/${taskId}`, task)
      .pipe(
        map(response => response.data)
      );
  }

  destroy(taskId: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/${taskId}`);
  }
}
