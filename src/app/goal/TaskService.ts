import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from "../models/task";
import { Reward } from "../models/reward";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // URL to web api
  private taskUrl = 'http://localhost:5000/api/tasks';
  private rewardUrl = 'http://localhost:5000/api/rewards';
  constructor(private http: HttpClient) { }

  getTasks(owner:any): Observable<Task[]> {
    return this.http.post<Task[]>(this.taskUrl + '/owntasks',owner,httpOptions);
  }

  getTaskById(id: any): Observable<Task> {
    return this.http.get<Task>(`${this.taskUrl}/${id}`);
  }

  addTask(task: Task): Observable<any> {
    return this.http.post<any>(this.taskUrl, task, httpOptions);
  }

  updateTaskById(task: Task, id: any): Observable<Task> {
    return this.http.put<Task>(`${this.taskUrl}/${id}`, task, httpOptions);
  }

  deleteTaskById(id: any): Observable<Task> {
    return this.http.delete<Task>(`${this.taskUrl}/${id}`);
  }

  //reward
  getRewards(owner:any): Observable<Reward[]> {
    return this.http.post<Reward[]>(this.rewardUrl + '/ownrewards',owner,httpOptions);
  }

  getRewardById(id: any): Observable<Reward> {
    return this.http.get<Reward>(`${this.rewardUrl}/${id}`);
  }

  addReward(reward: Reward): Observable<any> {
    return this.http.post<any>(this.rewardUrl, reward, httpOptions);
  }

  updateRewardById(reward: Reward, id: any): Observable<Reward> {
    return this.http.put<Reward>(`${this.rewardUrl}/${id}`, reward, httpOptions);
  }

  deleteRewardById(id: any): Observable<Reward> {
    return this.http.delete<Reward>(`${this.rewardUrl}/${id}`);
  }

}
