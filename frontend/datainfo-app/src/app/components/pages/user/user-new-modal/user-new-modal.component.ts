import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {environment} from "../../../../../environments/environment";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

  form: FormGroup;
  errors = {};
  // user = {
  //     'name': '',
  //     'email': '',
  //     'password': ''
  // };

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private http: HttpClient,
              private userHttpService: UserHttpService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(255)]],
      'email': ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    });
  }

  ngOnInit() {
  }

  submit() {
    this.userHttpService
        .create(this.form.value)
        // .post(`${environment.api.url}/users`, this.user)
        .subscribe((user) => {
            this.form.reset({
              'name': '',
              'email': '',
              'password': ''
            });
            this.onSuccess.emit(user);
            this.modal.hide();
        }, error => {
          if (error.status === 422){
            this.errors = error.error.errors;
          }
          this.onError.emit(error);
        });
  }

  showModal() {
      this.modal.show();
  }

  hideModal($event) {
      //fazer algo quando o modal for fechado
      console.log($event);
      this.modal.hide();
  }

  showError(){
    return Object.keys(this.errors).length != 0;
  }
}
