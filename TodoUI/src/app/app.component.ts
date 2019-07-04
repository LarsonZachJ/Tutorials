import { Component, OnInit } from '@angular/core';
import { TodoService } from './core';
import { Observable } from 'rxjs';
import { TodoItem } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todoItems$: Observable<Array<TodoItem>>;

  ngOnInit(): void {
    this.todoItems$ = this._todoService.GetAllTodoItems()
  }

  constructor(private _todoService: TodoService) { }
}
