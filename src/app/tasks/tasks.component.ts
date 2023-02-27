import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService, Task } from '../data.service';
import { User } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  user = sessionStorage.getItem('user');
  tasks = this.DataService.getTasks();



  ngOnInit(): void {}

  // Snack bar on actions
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 500 });
  }

  // get tasks from db

  // change task to done status
  do(task: Task) {
    this.DataService.changeitem(task);
  }

  // delete task
  delete(task: Task) {
    this.DataService.deleteItem(task);
  }

  // translate task
  async translateTask(task: Task) {
    console.log(task)
    try {
      const translatedTask = await this.DataService.translateItem(task);
      task.name = translatedTask.name;
      task.description = translatedTask.text;
    } catch (error) {
      console.error('Error translating task:', error);
      this.openSnackBar('Error translating task', 'Close');
    }
  }


  constructor(
    private _snackBar: MatSnackBar,
    private DataService: DataService,
    private Router: Router
  ) {}
}
