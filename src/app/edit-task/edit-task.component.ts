import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import {DataService, Task} from '../data.service'


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
      this.DataService.addItem(this.taskForm.get('name')?.value, this.taskForm.get('description')?.value, sessionStorage.getItem('user') as string)
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
    console.log(taskIdFromRoute)

    let tasks = this.DataService.getItems(false);
    console.log(tasks);
    console.log(tasks.length);

    // -1231 its just a custom identifier that identifies that we adding item not editing 
    if( taskIdFromRoute == -1231){
      this.task = undefined
      console.log(-1231)
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
