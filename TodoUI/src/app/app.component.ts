import { Component, OnInit } from '@angular/core';
import { TodoService, ToastService } from '@app/core';
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

  public DisplayThings(): void {
    this._toastService.DisplayError('Error', 'Error');
    this._toastService.DisplayInfo('Info', 'Info');
    this._toastService.DisplaySuccess('Success', 'Success');
    this._toastService.DisplayWarn('Warn', 'Warn');
  }

  constructor(private _todoService: TodoService, private _toastService: ToastService) { }
}
