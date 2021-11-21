import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { GoalService } from '../goal.service';
@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  task:Task[];
  constructor(private goalSer:GoalService) { }

  ngOnInit(): void {
    this.loadGoals()
  }
  loadGoals():void{
    this.goalSer.loadGoalDetails().subscribe(data=>this.task=data,error=>console.log(error))
  }
  newTodo():void{}

}
