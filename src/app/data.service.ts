import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Timestamp, map } from 'rxjs';



// create Task
export interface Task {
  id: number,
  name:string,
  description:string,
  deleted: boolean,
  translated: boolean,
  translated_date: Timestamp<number> | null,
  done: boolean,
  done_date: Timestamp<number> | null,
  user_id: number
}

export interface User { 
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService{
  items: Task[] = [];
  users: User[] = []

  // add task to tasks
  addItem(name: unknown, description: unknown) {
    this.items.push(    {
      id: this.items.length + 1,
      name: name as string,
      description: description as string,
      done: false,
      translated: false,
      deleted: false,
      translated_date: null,
      done_date: null,
      user_id: 0
    })
  }


  // get tasks
  getTasks(user_id: number = 1) {
    const url = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/getTasks';
    const body = { user_id: 1 };
    this.http.post(url, body).subscribe(
      (data) => {
        this.items.push(data as Task); // This will log the response data to the console
      },
      (error) => {
        console.log(error); // This will log any errors to the console
      }
    );


    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/function-1';
    const bodys = { name:  'dasd'  };
    let ress = this.http.post(url, body);
    console.log(ress)

    return this.items
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


  constructor(private http: HttpClient){}
  

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
    let accounts = this.getUsers()
    if(accounts.includes(user)){
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
