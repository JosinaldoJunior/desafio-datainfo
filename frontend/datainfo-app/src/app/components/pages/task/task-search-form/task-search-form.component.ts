import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'task-search-form',
  templateUrl: './task-search-form.component.html',
  styleUrls: ['./task-search-form.component.css']
})
export class TaskSearchFormComponent implements OnInit {

  search = '';

  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  submit(){
      this.onSearch.emit(this.search);
      return false;
  }

}
