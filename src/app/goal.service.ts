import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private httpClient:HttpClient) { }
  loadGoalDetails():Observable<Task[]>{
    return this.httpClient.get<Task[]>("http://localhost:3000/task");
  }
}

