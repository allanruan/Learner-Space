export class Task{
    _id:number;
    owner:string;
    desc:string;
    deadline:Date;
    priority:number;
    reward:number;
    status:string; //finished or in progress
}