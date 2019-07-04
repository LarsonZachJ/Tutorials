import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TodoItem } from '@app/shared';

@Injectable()
export class TodoService {

    public GetAllTodoItems(): Observable<Array<TodoItem>> {
        return this._http.get<Array<TodoItem>>(`${environment.apiUrl}/todo`);
    }

    public GetTodoItemById(id: number): Observable<TodoItem> {
        return this._http.get<TodoItem>(`${environment.apiUrl}/todo/${id}`);
    }

    public CreateTodoItem(todoItem: TodoItem): Observable<TodoItem> {
        return this._http.post<TodoItem>(`${environment.apiUrl}/todo`, todoItem);
    }

    public UpdateTodoItem(todoItem: TodoItem): Observable<TodoItem> {
        return this._http.put<TodoItem>(`${environment.apiUrl}/todo/${todoItem.Id}`, todoItem);
    }

    public DeleteTodoItem(id: number): Observable<TodoItem> {
        return this._http.delete<TodoItem>(`${environment.apiUrl}/todo/${id}`);
    }

    constructor(private _http: HttpClient) { }
}