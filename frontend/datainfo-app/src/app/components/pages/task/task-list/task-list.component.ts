import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TaskNewModalComponent} from "../task-new-modal/task-new-modal.component";
import {TaskEditModalComponent} from "../task-edit-modal/task-edit-modal.component";
import {TaskDeleteModalComponent} from "../task-delete-modal/task-delete-modal.component";
import {AuthService} from "../../../../services/auth.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {environment} from "../../../../../environments/environment";
import {TaskHttpService} from "../../../../services/http/task-http.service";
import {Task} from "../../../../model";

declare let $;

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Array<Task>;

  @ViewChild(TaskNewModalComponent)
  taskNewModal: TaskNewModalComponent;

  @ViewChild(TaskEditModalComponent)
  taskEditModal: TaskEditModalComponent;

  @ViewChild(TaskDeleteModalComponent)
  taskDeleteModal: TaskDeleteModalComponent;

  taskId: number;
  searchText: string;

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient,
              private authService: AuthService,
              private notifyMessage: NotifyMessageService,
              private taskHttpService: TaskHttpService) {
  }

  ngOnInit() {
      this.getTasks();
  }

  getTasks() {
      const strSearch = this.searchText ? `&search=${this.searchText}` : '';
      this.taskHttpService
        .list(strSearch, this.authService.me.id)
        .subscribe(response => {
           this.tasks = response.data;
        });
  }

  showModalInsert(){
      this.taskNewModal.showModal();
  }

  showModalEdit(taskId: number) {
      this.taskId = taskId;
      this.taskEditModal.showModal();
  }

  showModalDelete(taskId: number) {
      this.taskId = taskId;
      this.taskDeleteModal.showModal();
  }

  onInsertSuccess($event: any) {
      this.notifyMessage.success('Tarefa cadastrada com sucesso.');
      this.getTasks();
  }

  onInsertError($event: HttpErrorResponse) {
      this.notifyMessage.error('Erro ao cadastrar tarefa.');
      console.log($event);
  }

  onEditSuccess($event: any) {
      this.notifyMessage.success('Tarefa atualizada com sucesso.');
      this.getTasks();
  }

  onEditError($event: HttpErrorResponse) {
      this.notifyMessage.error('Erro ao atualizar tarefa.');
  }

  onDeleteSuccess($event: any) {
      this.notifyMessage.success('Tarefa excluída com sucesso.');
      this.getTasks();
  }

  onDeleteError($event: HttpErrorResponse) {
      this.notifyMessage.error('Erro ao excluir tarefa.');
  }

  search(search) {
      this.searchText = search;
      this.getTasks();
  }
}
