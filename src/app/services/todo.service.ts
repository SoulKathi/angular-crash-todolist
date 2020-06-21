import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/Todo';
import { Console, assert } from 'console';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosUrl:string = 'http://localhost:3000/todos';
  todosPath:string = '../../../db.json';
  todosLimit = 'limit=5';
  todosFilter = '';

  constructor(private http:HttpClient) { 
    console.log(this.todosPath)
  }

  // Get Todos
  getTodos(filter?:string,limit?:number):Observable<Todo[]> {
    if(filter != null){
      this.todosFilter=filter;
    }
    if(limit != null){
      this.todosLimit = 'limit=' + limit
    }
    console.log(this.todosLimit)
    return this.http.get<Todo[]>(`${this.todosUrl}?_${this.todosLimit}&${this.todosFilter}`);
  }

  // Delete Todo
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle Completed
  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
}
