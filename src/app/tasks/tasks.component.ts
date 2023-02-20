import { Component } from '@angular/core';

import { tasks, Task } from 'src/tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks = tasks;

  do(task:Task) {
    tasks.map((obj) => {obj.id === task.id ? obj.done=true : obj})
  }

  delete(task:Task){
    tasks.filter((obj) => {obj.id !== task.id})
  }
}