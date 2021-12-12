import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task';
import {TaskService} from './TaskService'
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { relativeTimeThreshold } from 'moment';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  notify:string;
  reward:number=0;
  counter=1;
  searchId:number;
  formData:any = {};
  taskForm:FormGroup;
  tasks:Task[];
  errors:any = [];
  constructor(private taskService:TaskService, private fb:FormBuilder, private router:Router,private route:ActivatedRoute,public auth:AuthService) { }
  flag:number=0;
  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'saved';
      const key2 = 'deleted';
      const key3 = 'updated';
      if (params[key1] === 'success') {
        this.notify = 'Task saved';
        setTimeout(()=>this.notify='',3000);
      }
      if (params[key2] === 'success') {
        this.notify = 'Task deleted';
        setTimeout(()=>this.notify='',3000);
      }
      if (params[key3] === 'success') {
        this.notify = 'TasK updated';
        setTimeout(()=>this.notify='',3000);
      }
      this.getTask();
      console.log("after init")
      console.log(this.tasks);
      this.reward=0;
      setTimeout(()=>this.calcReward(),1500)
    });
  }

  initForm(): void {
    this.taskForm = this.fb.group({
    _id: ['', [Validators.required]],
	  desc: ['', [Validators.required]],
	  deadline: ['', [Validators.required]]
    });
    this.formData={owner:this.auth.getUserid()};
    // this.formData.status = "--selected--"
  }
  isValidInput(fieldName): boolean {
    return this.taskForm.controls[fieldName].invalid &&
      (this.taskForm.controls[fieldName].dirty || this.taskForm.controls[fieldName].touched);
  }

  getTask():void{
    console.log("getting Task");
    console.log(this.formData);
    this.taskService.getTasks(this.formData).subscribe(result => {
      this.tasks = result;
      console.log(this.tasks);
      this.flag=1;
      this.initForm();
    })
  }

  getForm():void{
    this.flag=2;
  }
  updateForm(id,owner,desc, deadline, priority, reward, status){
    this.formData._id=id;
    this.formData.owner=owner;
  	this.formData.desc=desc;
    this.formData.deadline=deadline;
  	this.formData.priority=priority;
    this.formData.reward=reward;
    this.formData.status=status;
    this.flag=3;
  }

  addTask():void{
    console.log(this.formData)
    this.taskService.addTask(this.formData)
      .subscribe(() => {
        this.flag=1;
        this.router.navigate(['/goals'], { queryParams: { saved: 'success' } });
        this.getTask();
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
		});
    this.formData={owner:this.auth.getUserid()};
    }
  getTaskById():void{
    // console.log(this.searchId)
    this.taskService.getTaskById(this.searchId).subscribe(result => {
      this.tasks = [result];
      console.log(this.tasks);
      this.flag=1;
      this.getTask();
    });
  }
  updateTaskById():void{
    console.log(this.formData);
    this.taskService.updateTaskById(this.formData,this.formData._id).subscribe(() => {
      this.flag=1;
      this.router.navigate(['/goals'], { queryParams: { updated: 'success' } });
      this.initForm();
      this.getTask();
    },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
	  });
    this.formData={owner:this.auth.getUserid()};
  }

  deleteTaskById(id):void{
    // console.log(id);
    this.flag=0;
    this.taskService.deleteTaskById(id).subscribe(() => {
      this.router.navigate(['/goals'], { queryParams: { deleted: 'success' } });
      this.initForm();
      this.getTask();
    },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }
  calcReward():void{
    for(var task of this.tasks){
      if(task.status=="Completed"){
        this.reward=this.reward+task.reward;
      }
    }
  }
}
