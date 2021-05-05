import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.css']
})
export class TaskEditModalComponent implements OnInit {

  task = {
    'name': '',
    'completed': '',
  };

  _taskId: number;

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
  }

  @Input()
  set taskId(value) {
      this._taskId = value;
      if(this._taskId) {
          this.http.get<{data: any}>(`${environment.api.url}/todo-lists/${value}`)
              .subscribe((response) => {
                this.task = response.data;
              });
      }
  }

  submit() {
      // const token = window.localStorage.getItem('token');
      this.http
          .put(`${environment.api.url}/todo-lists/${this._taskId}`, this.task)
          .subscribe((task) => {
              this.onSuccess.emit(task)
              this.modal.hide();
          }, error => this.onError.emit(error));
  }

  showModal() {
      this.modal.show();
  }

  hideModal($event: Event) {
      console.log($event);
  }

}
