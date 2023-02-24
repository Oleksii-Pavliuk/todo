import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from 'src/app/tasks';
import { MatSnackBar } from '@angular/material/snack-bar';
import {DataService} from '../data.service'


// Add or edit task
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent implements OnInit {

  task: Task | undefined


  // Form inputs
  taskForm = this.formBuilder.group({     
  name: new FormControl( ' ' ,Validators.required) ,
  description: new FormControl('',Validators.required),

  });

  // Add task form submit
  AddSubmit(): void{
      this.DataService.addItem(this.taskForm.get('name')?.value, this.taskForm.get('description')?.value)
      this.openSnackBar('Task added')
      this.Router.navigate(['/']);
  }

  // Add task form submit
  EditSubmit(id: number): void{
    this.DataService.editItem(this.taskForm.get('name')?.value, this.taskForm.get('description')?.value,id)
    this.openSnackBar('Task edited')
  }


  // Show snackbar
  openSnackBar(message: string, action = '') {
    this._snackBar.open(message, action, {duration:5000})
  }



  ngOnInit() {
    // Get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const taskIdFromRoute = Number(routeParams.get('taskId'));

    let tasks = this.DataService.getTasks();
  
    // -1231 its just a custom identifier that identifies that we adding item not editing 
    if( taskIdFromRoute == -1231){
      this.task == undefined
    }else{
    // Find the product that correspond with the id provided in route.
    this.task = tasks.find(task => task.id === taskIdFromRoute);
    if(this.task){
      this.taskForm.setValue({name : this.task.name, description: this.task.description})

    }
    }
  }

  // Add services
  constructor(private route: ActivatedRoute,
    private Router: Router,
    private formBuilder : FormBuilder,
    private _snackBar: MatSnackBar,
    private DataService: DataService,) {}

}
