import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Task } from '../tasks';
import { TranslateService } from '../transalte.service';
import {DataService} from '../data.service'

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
      
    }

  // Snack bar on actions
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration:500})
  }

  // get tasks from db
  tasks = this.DataService.getItems();

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
    private DataService: DataService) {}

  
}