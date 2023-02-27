import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

import { TranslateService } from '../transalte.service';
import {DataService, Task} from '../data.service'
import { User } from '../users.service';
import { Router } from '@angular/router';

// List of tasks

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit{




    // translate task
    shippingCosts!: Observable<{ type: string, price: number }[]>;
  
    ngOnInit(): void {
      if(!sessionStorage.getItem('user')){
        this.Router.navigate(['authenticate'])
      }
    }

  // Snack bar on actions
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration:500})
  }

  // get tasks from db
  tasks = this.DataService.getTasks()

  // change task to done status
  do(task:Task){
    this.DataService.changeitem(task)
  }

  // delete task
  delete(task:Task){
    this.DataService.deleteItem(task)
  }

  // add service
  constructor(private _snackBar: MatSnackBar,
    private DataService: DataService,
    private Router: Router) {}

  
}