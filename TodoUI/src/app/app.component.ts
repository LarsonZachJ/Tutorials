import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService, ToastService } from '@app/core';
import { TodoItem, TableColumn } from '@app/shared';
import { Table } from 'primeng/table';
import { SelectItem, Dropdown, DialogService } from 'primeng/primeng';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { EditTodoComponent } from './edit-todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('todoTable', { static: false }) todoTable: Table;
  @ViewChild('booleanDropDown', { static: false }) booleanDropDown: Dropdown;
  todoItemForm: FormGroup;
  todoItems: Array<TodoItem>;
  tableColumns: Array<TableColumn>;
  selectedTodoItem: TodoItem;
  booleanOptions: Array<SelectItem>;
  emptySelectFilter: SelectItem;

  public Clear(): void {
    this.todoTable.reset();
    this.booleanDropDown.selectedOption = this.emptySelectFilter;
    this.todoItemForm.reset();
  }

  public CreateTodoItem(): void {
    const newItem = this.todoItemForm.value;
    this._todoService.CreateTodoItem(newItem).subscribe(
      res => {
        this.todoItems.push(res);
        this.todoItems = [...this.todoItems];
      },
      err => console.error(err)
    );
  }

  public ToggleTodoItem(todoItem: TodoItem) {
    const objectCopy: TodoItem = new TodoItem();
    Object.assign(objectCopy, todoItem);
    objectCopy.IsComplete = !objectCopy.IsComplete;
    this._todoService.UpdateTodoItem(objectCopy).subscribe(
      res => {
        const index = this.todoItems.findIndex(t => t.Id === res.Id);
        this.todoItems[index] = res;
        this.todoItems = [...this.todoItems];
        this._toastService.DisplaySuccess(
          'Success',
          `Todo Item ${res.Id} has been marked ${
            res.IsComplete ? 'complete' : 'incomplete'
          }`
        );
      },
      err => console.error(err)
    );
  }

  public DisplayEditDialog(): void {
    const reference = this._dialogService.open(EditTodoComponent, {
      data: { id: this.selectedTodoItem.Id },
      header: 'Edit Todo Item',
      width: '25%',
      closable: false
    });

    reference.onClose.subscribe((todoItem: TodoItem) => {
      if (todoItem) {
        const index = this.todoItems.findIndex(t => t.Id === todoItem.Id);
        this.todoItems[index] = todoItem;
        this.todoItems = [...this.todoItems];
      }
    });
  }

  ngOnInit(): void {
    this.BuildForm();
    this._todoService
      .GetAllTodoItems()
      .subscribe(res => (this.todoItems = res), err => console.error(err));
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

  private BuildForm(): void {
    this.todoItemForm = this._fb.group({
      Name: new FormControl(null, Validators.compose([Validators.required])),
      IsComplete: new FormControl(
        false,
        Validators.compose([Validators.required])
      )
    });
  }

  constructor(
    private _todoService: TodoService,
    private _toastService: ToastService,
    private _fb: FormBuilder,
    private _dialogService: DialogService
  ) {}
}
