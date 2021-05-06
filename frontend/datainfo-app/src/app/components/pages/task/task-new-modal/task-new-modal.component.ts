import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {environment} from "../../../../../environments/environment";
import {TaskHttpService} from "../../../../services/http/task-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'task-new-modal',
  templateUrl: './task-new-modal.component.html',
  styleUrls: ['./task-new-modal.component.css']
})
export class TaskNewModalComponent implements OnInit {

  form: FormGroup;
  errors = {};

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

  submit(){

    this.taskHttpService.create(this.form.value)
      .subscribe((task) => {
          this.form.reset({
            name: '',
            completed: false,
            user_id: this.authService.me.id,
          });
          this.onSuccess.emit(task);
          this.modal.hide();
      }, error => {
          if (error.status === 422){
            this.errors = error.error.errors;
          }
          this.onError.emit(error);
      });

    // this.http
      //     .post(`${environment.api.url}/api/todo-lists`, this.task)
      //     .subscribe((task) => {
      //         this.onSuccess.emit(task)
      //         this.modal.hide();
      //     }, error => this.onError.emit(error));
  }

  showModal() {
      this.modal.show();
  }

  hideModal($event: Event) {
      //fazer algo quando o modal for fechado
      console.log($event);
  }

  showError(){
    return Object.keys(this.errors).length != 0;
  }

}
