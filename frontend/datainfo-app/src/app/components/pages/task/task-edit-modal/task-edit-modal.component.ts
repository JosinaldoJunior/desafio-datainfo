import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskHttpService} from "../../../../services/http/task-http.service";

@Component({
  selector: 'task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.css']
})
export class TaskEditModalComponent implements OnInit {

  form: FormGroup;
  errors = {};

  _taskId: number;

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private http: HttpClient,
              private authService: AuthService,
              private taskHttpService: TaskHttpService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'completed': false,
      'user_id': authService.me.id
    });
  }

  ngOnInit() {
  }

  @Input()
  set taskId(value) {
      this._taskId = value;
      if(this._taskId) {
          this.taskHttpService.get(this._taskId)
            .subscribe(
          task => this.form.patchValue(task),
          responseError => {
                  if (responseError.status == 401){
                    this.modal.hide();
                  }
            });
      }
  }

  submit() {
      this.taskHttpService
          .update(this._taskId, this.form.value)
          .subscribe((task) => {
              this.onSuccess.emit(task);
              this.modal.hide();
          }, error => {
            if(error.status === 422) {
              this.errors = error.error.errors;
            }
            this.onError.emit(error);
          });
  }

  showModal() {
      this.modal.show();
  }

  hideModal($event: Event) {
      console.log($event);
  }

  showError(){
    return Object.keys(this.errors).length != 0;
  }

}
