import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService, ToastService } from '@app/core';
import { Observable } from 'rxjs';
import { TodoItem, TableColumn } from '@app/shared';
import { Table } from 'primeng/table';
import { SelectItem, Dropdown } from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('todoTable', { static: false }) todoTable: Table;
  @ViewChild('booleanDropDown', { static: false }) booleanDropDown: Dropdown;
  todoItems$: Observable<Array<TodoItem>>;
  tableColumns: Array<TableColumn>;
  selectedTodoItem: TodoItem;
  booleanOptions: Array<SelectItem>;
  emptySelectFilter: SelectItem;

  ngOnInit(): void {
    this.todoItems$ = this._todoService.GetAllTodoItems();
    this.emptySelectFilter = { label: 'Select Filter...', value: null };
    this.booleanOptions = [
      this.emptySelectFilter,
      { label: 'Complete', value: true },
      { label: 'Incomplete', value: false }
    ];
    this.tableColumns = [
      { field: 'Id', header: 'Id', type: 'text' },
      { field: 'Name', header: 'Name', type: 'text' },
      { field: 'IsComplete', header: 'IsComplete', type: 'boolean' }
    ];
  }

  public Clear(): void {
    this.todoTable.reset();
    this.booleanDropDown.selectedOption = this.emptySelectFilter;
  }

  constructor(
    private _todoService: TodoService,
    private _toastService: ToastService
  ) {}
}
