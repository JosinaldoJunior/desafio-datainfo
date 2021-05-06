import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {environment} from "../../../../../environments/environment";
import {TaskHttpService} from "../../../../services/http/task-http.service";

@Component({
  selector: 'task-delete-modal',
  templateUrl: './task-delete-modal.component.html',
  styleUrls: ['./task-delete-modal.component.css']
})
export class TaskDeleteModalComponent implements OnInit {

  task = null;

  _taskId: number;

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private http: HttpClient,
              private taskHttpService: TaskHttpService) { }

  ngOnInit() {
  }

  @Input()
  set taskId(value){
    this._taskId = value;
    if(this._taskId){
      this.http.get<{data: any}>(`${environment.api.url}/todo-lists/${value}`)
          .subscribe((response) => this.task = response.data);
    }
  }

  destroy(){
    this.taskHttpService.destroy(this._taskId)
      .subscribe((task) => {
        this.onSuccess.emit(task);
        this.modal.hide();
    }, error => this.onError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    // tslint:disable-next-line:comment-format
    //fazer algo quando o modal for fechado
    console.log($event);
  }
}
