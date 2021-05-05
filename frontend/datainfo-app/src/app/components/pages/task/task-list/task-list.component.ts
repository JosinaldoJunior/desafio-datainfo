import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TaskNewModalComponent} from "../task-new-modal/task-new-modal.component";
import {TaskEditModalComponent} from "../task-edit-modal/task-edit-modal.component";
import {TaskDeleteModalComponent} from "../task-delete-modal/task-delete-modal.component";
import {AuthService} from "../../../../services/auth.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {environment} from "../../../../../environments/environment";

declare let $;

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Array<{ id: number; name: string; completed: boolean; created_at: { date: string }, updated_at: { date: string } }>;

  @ViewChild(TaskNewModalComponent)
  taskNewModal: TaskNewModalComponent;

  @ViewChild(TaskEditModalComponent)
  taskEditModal: TaskEditModalComponent;

  @ViewChild(TaskDeleteModalComponent)
  taskDeleteModal: TaskDeleteModalComponent;

  taskId: number;
  searchText: string;

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private authService: AuthService, private notifyMessage: NotifyMessageService) {

  }

  ngOnInit() {
      this.getTasks();
  }

  getTasks() {
      const strSearch = this.searchText ? `&search=${this.searchText}` : '';
    // tslint:disable-next-line:max-line-length
      this.http.get<{data: Array<{id: number, name: string, completed: boolean; created_at: { date: string }, updated_at: { date: string }}>}>
        // tslint:disable-next-line:max-line-length
        (`${environment.api.url}/todo-lists?userId=${this.authService.me.id}${strSearch}`).subscribe(response => this.tasks = response.data);
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
