import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService, ToastService } from '@app/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/primeng';
import { TodoItem } from '@app/shared';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit, OnDestroy {
  editTodoForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public UpdateTodoItem(): void {
    const item: TodoItem = {
      Id: this.editTodoForm.controls['Id'].value,
      Name: this.editTodoForm.controls['Name'].value,
      IsComplete: this.editTodoForm.controls['IsComplete'].value
    };
    this._todoService.UpdateTodoItem(item).subscribe(
      res => {
        this.ref.close(res);
        this._toastService.DisplaySuccess(
          'Success',
          `Todo item ${res.Id} has been updated.`
        );
      },
      err => {
        console.error(err);
        this._toastService.DisplayError(
          'Failure',
          `Unable to update todo item ${item.Id}.`
        );
      }
    );
  }

  public CancelEdit(): void {
    this.ref.close(null);
  }

  private BuildForm(): void {
    this.editTodoForm = this._fb.group({
      Id: new FormControl(null, Validators.compose([Validators.required])),
      Name: new FormControl(null, Validators.compose([Validators.required])),
      IsComplete: new FormControl(
        false,
        Validators.compose([Validators.required])
      )
    });
  }

  private FillInForm(todoItem: TodoItem): void {
    this.editTodoForm.setValue(todoItem);
    this.editTodoForm.controls['Id'].disable();
  }

  ngOnInit(): void {
    this.BuildForm();
    this._todoService
      .GetTodoItemById(this.config.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.FillInForm(res);
        },
        err => console.error(err)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  constructor(
    private _todoService: TodoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _toastService: ToastService
  ) {}
}
