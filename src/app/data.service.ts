import { Injectable } from '@angular/core';
import { Task } from './tasks';

// create User interface
export interface User { 
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService{
  items: Task[] = [];
  users: User[] = [];

  // add task to tasks
  addItem(name: unknown, description: unknown) {
    this.items.push(    {
      id: this.items.length + 1,
      name: name as string,
      description: description as string,
      done:false,
    })
  }

  // get tasks
  getItems() {
    return this.items;
  }

  // edit task
  editItem(name: unknown, description: unknown, id: number){
    this.items.map((item) => {
      item.id === id ? (item.name = name as string, item.description = description as string) : item;
    });
    
  }

  // change task
  changeitem(task: Task) {
    this.items.map((item) => {
      item === task? item.done = !item.done : item;
    });
  }

  // delete task
  deleteItem(task: Task) {
    const index =this.items.indexOf(task);

    const x = this.items.splice(index, 1);
  }

  // add user
  addUser(user: User) {
    this.users.push(user);
  }

  // get users
  getUsers() {
    return this.users;
  }

  // login user
  checkUser(user: User){
    if(this.users.includes(user)){
      return true
    }else{
      return false
    }
  }

  // delete user
  deleteuser(user: User) {
    this.users.filter((obj) => {
      obj != user;
    });
  }
}
